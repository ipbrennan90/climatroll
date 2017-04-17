import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Button
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import TempControl from './ios/Components/TempControl/TempControl.ios.js';
import Home from './ios/Components/Home/Home.ios.js'

const ClimaTroll = StackNavigator({
  Home: { screen: Home },
  TempControl: { screen: TempControl},
});

AppRegistry.registerComponent('climatroll', () => ClimaTroll);
