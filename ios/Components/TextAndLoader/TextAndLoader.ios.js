import React, { Component } from 'react';
import {
  View,
  Text,
  ActivityIndicator
} from 'react-native';

export default class TextAndLoader extends Component {

  setNativeProps(nativeProps) {
    console.log(nativeProps)
    this._root.setNativeProps(nativeProps);
  }
  render() {
    const { loaderStyle, textStyle, text, loading } = this.props;
    return (
      <View ref={component => this._root = component}>
        {this.props.loading &&
          <ActivityIndicator style={ loaderStyle } animating/>
        }
        {!this.props.loading &&
          <Text style={ textStyle }>{text}</Text>
        }
      </View>
    )
  }
}
