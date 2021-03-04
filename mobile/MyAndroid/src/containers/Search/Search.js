import React, {Component} from 'react';
import {View, Text, StyleSheet, Button, SafeAreaView} from 'react-native';

export default class Home extends Component {
  // constructor() {}

  handleScan = () => {
    console.log('扫一扫');
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Button title="扫一扫" color="red" onPress={this.handleScan} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    // color: 'red',
    color: '#000',
  },
});
