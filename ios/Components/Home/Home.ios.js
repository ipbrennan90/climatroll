import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Button,
  TextInput,
  TouchableHighlight
} from 'react-native';
import { styles } from './Styles'

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.navigate = props.navigation.navigate
    this._onChangeEmail = this._onChangeEmail.bind(this);
    this._onChangePassword = this._onChangePassword.bind(this);
    this._login = this._login.bind(this);
    this.state = {
      email: '',
      password: ''
    }
  }

  _onChangeEmail(text) {
    let state = this.state;
    state.email = text;
    this.setState(state);
  }

  _onChangePassword(text) {
    let state = this.state;
    state.password = text;
    this.setState(state);
  }

  _login() {
    console.log(this.state)
  }

  static navigationOptions = {
    title: 'Welcome',
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput onChangeText={ this._onChangeEmail } style={ styles.textInput } placeholder="Email" keyboardType="email-address" value={ this.state.email }/>
        <TextInput onChangeText={ this._onChangePassword } style={ styles.textInput } placeholder="Password" secureTextEntry value ={ this.state.password }/>
        <TouchableHighlight onPress={ this._login } style={ styles.button }>
          <Text style={ styles.buttonText }>Login</Text>
        </TouchableHighlight>
        <Button onPress={() => this.navigate('TempControl')} title="Control Temperature" />
      </View>
    );
  }
}
