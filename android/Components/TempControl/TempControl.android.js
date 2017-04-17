import React , { Component } from 'react';
import {
  View,
  Text,
  Button
} from 'react-native';
import { styles } from './Styles'

export default class TempControl extends Component {
  static navigationOptions = {
    title: 'Temperature Control',
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text style={ styles.text } >Hello, Temp Controller!</Text>
      </View>
    )
  }
}
