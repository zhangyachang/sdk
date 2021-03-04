import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {Storage} from '../../utils';
// console.log('引入Native', Native.Native);

export default class Home extends Component {
  // constructor(props) {}

  componentDidMount() {
    Storage.setStorage('aaaa', 'bbbb');
  }

  handleGoWebView = () => {
    console.log('this.props', this.props);
    const {navigation} = this.props;
    navigation.navigate('WebView');
  };

  handleGetStorage = async () => {
    console.log('获取值');
    console.log("Native.getStorage('aaaa')", await Storage.getStorage('aaaa'));
    console.log('111', await Storage.getStorage('bbbb'));
  };

  handleSwitchTab = () => {
    const {navigation} = this.props;
    navigation.navigate('Search');
  };
  handleSwitchTabMy = () => {
    const {navigation} = this.props;
    navigation.navigate('My');
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>安卓app首页</Text>
        <Icon name="rocket" size={30} color="#900" />
        <AntDesign name="stepforward" size={30} color="blue" />
        <Button title="跳转到webView页面" onPress={this.handleGoWebView} />

        <Button title="获取Storage的值" onPress={this.handleGetStorage} />
        <Button title="跳转到其他Search" onPress={this.handleSwitchTab} />
        <Button title="跳转到其他My" onPress={this.handleSwitchTabMy} />
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
