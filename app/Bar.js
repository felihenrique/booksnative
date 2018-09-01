import React, { Component } from 'react';
import { Header, Body, Title, Left, Button, Icon } from 'native-base';
import Navigator from './Navigator'

export default class Bar extends Component {
    render() {
        return (
            <Header hasTabs>
                <Left>
                   <Button onPress={() => this.props.navigation.goBack()}>
                        <Icon name='arrow-round-back' />
                   </Button>
                </Left>
                <Body >
                    <Title color='white'>{this.props.title}</Title>
                </Body>
            </Header>
        );
    }
}