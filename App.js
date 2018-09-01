import React from 'react';
import { Text, Root } from 'native-base';
import Books from './app/data/BookStore'
import Navigator from './app/Navigator'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Ionicons': require("@expo/vector-icons/fonts/Ionicons.ttf"),
    });
    await Books.init();
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return <Text>Carregando...</Text>;
    }
    return (
      <Root>
        <Navigator />
      </Root>
    );
  }
}