import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class Home extends Component {
  // constructor() {}
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>安卓app Settings 页面</Text>
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
