/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {PARTICLE_KEY, PARTICLE_DEVICE} from 'react-native-dotenv'
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import API from './services/api'

export default class climatroll extends Component {
  constructor () {
    super()
    this.Api = new API(PARTICLE_DEVICE, PARTICLE_KEY)
  }

  _onPressOn() {
    this.Api.sendParticleCommand('led', 'on');
  }

  _onPressOff() {
    this.Api.sendParticleCommand('led', 'off');
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight style={[styles.button, styles.blue]} onPress={this._onPressOn.bind(this)}>
          <Text style={styles.buttonText} >Turn AC on</Text>
        </TouchableHighlight>
        <TouchableHighlight style={[styles.button, styles.red]} onPress={this._onPressOff.bind(this)}>
          <Text style={styles.buttonText} >Turn AC off</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    margin: 10,
    height: 30,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius
  },
  blue: {
    backgroundColor: 'blue'
  },
  red: {
    backgroundColor: 'red'
  },
  buttonText: {
    textAlign: 'center'
  }
});

AppRegistry.registerComponent('climatroll', () => climatroll);
