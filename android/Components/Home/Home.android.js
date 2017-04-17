import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Button
} from 'react-native';
import styles from './Styles';

export default class Home extends Component {
  static navigationOptions = {
    title: 'Welcome',
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>
          Welcome To Climatroll!
        </Text>
        <Button onPress={() => navigate('TempControl')} title="Control Temperature" />
      </View>
    );
  }
}
