import React, { Component } from 'react';
import Books from '../data/BookStore'
import { Button, List, ListItem, Left, Body, Right, Thumbnail, Text, Content } from 'native-base'
import Navigator from '../Navigator'

export default class TabMyBooks extends Component {

    componentWillMount() {
        Books.emitter.on('books_change', () => {
            this.setState({
                books: Books.books
            });
        })
        this.setState({
            books: Books.books
        });
    }

    render() {
        var content = null;
        if(this.state.books.length == 0) {
            content = <Text>Nenhum livro adicionado a lista de desejos</Text>;
        }
        else {
            content = 
            <Content>
            <List>
            {this.state.books.map(book => 
            <ListItem key={book.id} thumbnail>
                <Left>
                    <Thumbnail square source={{ uri: book.thumbnail }} />
                </Left>
                <Body>
                    <Text>{book.title}</Text>
                    <Text note numberOfLines={1}>{book.subtitle || book.description}</Text>
                </Body>
                <Right>
                    <Button transparent onPress={(event) => {this.onClickDetails(book, event)}}>
                        <Text>Detalhes</Text>
                    </Button>
                </Right>
            </ListItem>
            )}
            </List>
            </Content>;
        }
        return content;
    }

    onClickDetails = (book, event) => {
        this.props.navigation.navigate('BookDetails', { book });
    }
}