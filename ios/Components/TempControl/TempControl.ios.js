import React , { Component } from 'react';
import {
  View,
  Text,
  Button
} from 'react-native';
import { styles } from './Styles'

export default class TempControl extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentTemp: ''
    }
    this.refreshTemp = this.refreshTemp.bind(this);
    this.refreshTemp();
  }

  refreshTemp() {
    const { user, getTemp } = this.props.navigation.state.params
    getTemp(user).then((responseJson) => {
      const temp = `${parseInt(responseJson.result).toString()}${String.fromCharCode(176)}`
      this.setState({currentTemp: temp});
    })
  }
  static navigationOptions = {
    title: 'Temperature Control',
  };
  render() {
    const { navigate } = this.props.navigation;
    const { user } = this.props.navigation.state.params
    return (
      <View>
        <Text style={ styles.text } >{this.state.currentTemp}</Text>
        <Button onPress={this.refreshTemp} title="Get Temp"/>
        <Button onPress={navigate('ACControl', {user})} title="Control AC"/>
      </View>
    )
  }
}
