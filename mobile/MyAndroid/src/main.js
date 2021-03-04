/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {StackRouter} from './router';

const App = () => {
  return (
    <>
      <NavigationContainer>
        {StackRouter}
        {/* <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeStack} />
          <Stack.Screen name="WebView" component={WebView} />
        </Stack.Navigator> */}
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    // backgroundColor: Colors.lighter,
  },
});

export default App;
