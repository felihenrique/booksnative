import React, { Component } from 'react';
import { Container, Text, Button, Content, Card, CardItem, Toast } from 'native-base';
import { Image, Alert } from 'react-native';
import Bar from '../Bar';
import BookStore from '../data/BookStore'

export default class BookDetails extends Component {
    book = this.props.navigation.state.params.book;
    render() {
        var subtitle = null;
        if(this.book.subtitle) {
            subtitle = <CardItem header>
            <Text note>{this.book.subtitle}</Text>
            </CardItem>;
        }
        return (
            <Container>
                <Bar title={this.book.title} navigation={this.props.navigation} />
                <Content padder>
                    <CardItem>
                        <Image source={{uri: this.book.thumbnail}} style={{height: 100, width: 100, flex: 1}} />
                    </CardItem>
                    <CardItem header>
                        <Text>{this.book.title}</Text>
                    </CardItem>
                    {subtitle}
                    <CardItem header>
                        <Text note>{this.book.authors.reduce((prev, next) => prev += next)}</Text>
                    </CardItem>
                    <CardItem>
                        <Text>{this.book.description}</Text>
                    </CardItem>
                    <CardItem>
                        <Button block danger onPress={this.onClickRemover}>
                            <Text>Remover livro</Text>
                        </Button>
                    </CardItem>
                </Content>

            </Container>
        );
    }

    onClickRemover = async () => {
        Alert.alert('Confirmar', 'Deseja remover o livro da lista de desejos?', [
            {
                text: 'Ok',
                onPress: () => {
                    BookStore.deleteBook(this.book);
                    Toast.show({
                        text: 'Livro removido da lista de desejos.'
                    });
                    this.props.navigation.goBack();
                } 
            },
            {
                text: 'Cancelar'
            }
        ])
    }
}