import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import Home from './app/components/Home/Home'

import { Container, Content, Text, StyleProvider } from 'native-base';
import getTheme from './native-base-theme/components';
import platform from './native-base-theme/variables/platform';

export default class App extends Component {
  render() {
    return (
      <StyleProvider style={getTheme(platform)}>
        <AppNavigator />
      </StyleProvider>
    );
  }
}

const AppNavigator = StackNavigator({
  Home: {
    screen: Home,
  },
});
