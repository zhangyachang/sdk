import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {WebView} from 'react-native-webview';

export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <WebView source={{uri: 'http://baidu.com'}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  title: {
    // color: 'red',
    color: '#000',
  },
});
