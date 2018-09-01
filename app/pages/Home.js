import React, { Component } from 'react';
import { Container, Header, Tab, Tabs, Body, Title, TabHeading, Icon, Text } from 'native-base';
import TabMyBooks from '../tabs/TabMyBooks';
import TabBusca from '../tabs/TabBusca';
import Bar from '../Bar'

export default class Home extends Component {
    render() {
        return (            
            <Container>
                <Bar title='Livros' navigation={this.props.navigation} />
                <Tabs>
                    <Tab heading={
                        <TabHeading>
                            <Icon name="book" /> 
                            <Text>Lista de desejos</Text>
                        </TabHeading>
                    }>
                        <TabMyBooks navigation={this.props.navigation} />
                    </Tab>
                    <Tab heading={
                        <TabHeading>
                            <Icon name="search" /> 
                            <Text>Buscar livros</Text>
                        </TabHeading>
                    }>
                        <TabBusca navigation={this.props.navigation} />
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}