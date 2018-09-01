import React, { Component } from 'react';
import { Content, Spinner, Container, Header, Item, Input, 
    Icon, Button, Text, List, ListItem, Left, Body, Right, Thumbnail, Toast } from 'native-base';
import BookStore from '../data/BookStore';

export default class TabBusca extends Component {
    componentWillMount() {
        this.setState({
            searchBooks: [],
            textInput: "",
            loading: false
        })
    }

    renderImage(book) {
        if(book.volumeInfo.imageLinks) {
            return <Thumbnail square source={{ uri: book.volumeInfo.imageLinks.smallThumbnail }} />;
        }
        return null;
    }

    render() {
        var content = null;
        if(this.state.loading) {
            content = <Spinner />;
        }
        else {
            content = <List>
            {this.state.searchBooks.map(book =>
                <ListItem key={book.id} thumbnail>
                    <Left>
                        {this.renderImage(book)}
                    </Left>
                    <Body>
                        <Text>{book.volumeInfo.title}</Text>
                        <Text note numberOfLines={1}>{book.volumeInfo.subtitle || book.volumeInfo.description}</Text>
                    </Body>
                    <Right>
                        <Button transparent onPress={(event) => { this.onClickAdicionar(book, event) }}>
                            <Text>Adicionar</Text>
                        </Button>
                    </Right>
                </ListItem>
            )}
            </List>;
        }
        return (
            <Container>
                <Header searchBar rounded>
                    <Item>
                        <Icon name="search" />
                        <Input placeholder="Digite para buscar..." ref="search" 
                            onChangeText={(text) => this.setState({textInput : text})}
                            onEndEditing={this.onSearchInput} />
                    </Item>
                    <Button transparent>
                        <Text>Search</Text>
                    </Button>
                </Header>
                <Content>
                    {content}
                </Content>
            </Container>
        );
    }

    onSearchInput = async () => {
        if(this.state.textInput == '') {
            this.setState({
                searchBooks: []
            })
            return;
        }
        var urlApi = "https://www.googleapis.com/books/v1/volumes?q=" + this.state.textInput;
        this.setState({
            loading: true
        });
        var response = await fetch(encodeURI(urlApi));
        var books = await response.json();
        this.setState({
            searchBooks: books.items,
            loading: false
        });
    }

    onClickAdicionar = async (book, event) => {
        await BookStore.addBook({
            id: book.id,
            title: book.volumeInfo.title,
            subtitle: book.volumeInfo.subtitle,
            authors: book.volumeInfo.authors,
            description: book.volumeInfo.description,
            thumbnail: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.smallThumbnail : null
        })
        Toast.show({
            text: 'Livro adicionado a lista de desejos'
        });
    }
}