import React, { Component } from 'react';
import { realm } from '../../../realm';
import { ApiService } from '../../../services/api';
import TextAndLoader from '../TextAndLoader/TextAndLoader';

import {
  AppRegistry,
  Text,
  View,
  Button,
  TextInput,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';
import { styles } from './Styles'

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.navigate = props.navigation.navigate
    this._onChangeEmail = this._onChangeEmail.bind(this);
    this._onChangePassword = this._onChangePassword.bind(this);
    this._login = this._login.bind(this);
    this.account = null
    this.state = {
      email: '',
      password: '',
      error: null,
      loading: false
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
    this.setState({...this.state, loading: true});
    ApiService.particleLogin(this.state.email, this.state.password)
    .then((responseJson) => {
      console.log(responseJson);
      realm.write(() => {
        let user = realm.create('User', {
          id: Date.now() + Math.random(),
          accessToken: responseJson.access_token.toString(),
          devices: []
        })
        if (realm.objects('Account').length < 1) {
          realm.create('Account', {
            currentUser: user
          });
        } else {
          this.account = realm.objects('Account').slice(0, 1)
          this.account.currentUser = user
        }
      })
      this.setState({...this.state, loading: false});
      ApiService.particleListDevices(this.account.currentUser.accessToken)
      .then((devices) => {
        for(let i = 0; i < devices.length; i++) {
          ApiService.particleGetDeviceInfo(this.account.currentUser.accessToken, devices[i].id)
          .then((device) => {
            if (realm.objects('Device').filtered(`id = "${device.id}"`).length == 0) {
              realm.write(() => {
                let variables = Object.keys(device.variables)
                let newDevice = realm.create('Device', {
                  id: device.id,
                  name: device.name,
                  connected: device.connected,
                  variables: [],
                  functions: [],
                  lastHeard: new Date(device.last_heard)
                })
                for(let i = 0; i < device.functions.length; i++) {
                  newDevice.functions.push({ name: device.functions[i] });
                }
                for(let i = 0; i < variables.length; i++){
                  const variableName = variables[i];
                  const variableType = device.variables[variables[i]];
                  newDevice.variables.push({name: variableName, type: variableType});
                }
                this.account.currentUser.devices.push(newDevice);
              })
            } else if(this.account.currentUser.devices.filtered(`id = "${device.id}"`).length === 0) {
              realm.write(() => {
                this.account.currentUser.devices.push(realm.objects('Device').filtered(`id = "${device.id}"`)[0]);
              })
            }
            console.log(this.account.currentUser.devices.slice(0,3))
          })
        }
      })
    })
    .catch((error) => {
      console.log(error);
      this.setState({...this.state, error: 'Username or password incorrect.', loading: false})
      setTimeout(() => {
        this.setState({
          ...this.state,
          password: '',
          error: null
        })
      }, 1000)
    })
  }

  toDevices() {
    if (!this.account) return this.setState({...this.state, error: 'No account could be found, please try again'});

  }

  static navigationOptions = {
    title: 'Welcome',
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput onChangeText={ this._onChangeEmail } style={ styles.textInput } placeholder="Email" keyboardType="email-address" value={ this.state.email }/>
        <TextInput onChangeText={ this._onChangePassword } style={ styles.textInput } placeholder="Password" secureTextEntry value ={ this.state.password }/>
        {this.state.error &&
          <Text style={ styles.error }>{this.state.error}</Text>
        }
        <TouchableHighlight onPress={ this._login } style={ styles.button }>
          <TextAndLoader loading={this.state.loading} textStyle={ styles.buttonText } loaderStyle={styles.loader} text="Loading" />
        </TouchableHighlight>
      </View>
    );
  }
}
