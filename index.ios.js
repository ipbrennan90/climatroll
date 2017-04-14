import React, { Component } from 'react';
import {
  AppRegistry,
  Text
} from 'react-native';

import { StackNavigator } from 'react-navigation';

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    return (
      <Text>
        Hello, NAVIGATION!
      </Text>
    )
  }
}

const SimpleApp = StackNavigator({
  Home: { screen: HomeScreen },
});

AppRegistry.registerComponent('climatroll', () => SimpleApp);
