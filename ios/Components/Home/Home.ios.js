import React, { Component } from 'react';
import { realm } from '../../../realm';
import { ApiService } from '../../../services/api';
import TextAndLoader from '../TextAndLoader/TextAndLoader';
import { Device } from '../../../models/Device';

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
    this.getTemp = this.getTemp.bind(this);
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

      ApiService.particleListDevices(this.account.currentUser.accessToken)
      .then((devices) => {
        for(let i = 0; i < devices.length; i++) {
          ApiService.particleGetDeviceInfo(this.account.currentUser.accessToken, devices[i].id)
          .then((device) => {
            if (Device.exists(device.id)) {
              let newDevice = Device.saveDevice(device);
              realm.write(() => {
                this.account.currentUser.devices.push(newDevice);
              })
              this.navigate('TempControl', {user: this.account.currentUser, getTemp: this.getTemp})
            } else {
              realm.write(() => {
                this.account.currentUser.devices.push(realm.objects('Device').filtered(`id = "${device.id}"`)[0]);
              })
              this.navigate('TempControl', {user: this.account.currentUser, getTemp: this.getTemp})
            }
          })
        }
      })
    })
    .catch((error) => {
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

  getTemp(user) {
    console.log(user)
    let tempSensor;
    for(let i = 0; i < user.devices.length; i++) {
      const device = user.devices.slice(i, i+1)[0]
      const hasTemp = device.variables.filtered('name = "temperatureF"').length > 0
      debugger;
      if(hasTemp) tempSensor = device
    }
    return ApiService.particleGet(user.accessToken, tempSensor.id, 'temperatureF')
  }

  static navigationOptions = {
    title: 'Welcome',
  };

  render() {
    const { navigate } = this.props.navigation
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
