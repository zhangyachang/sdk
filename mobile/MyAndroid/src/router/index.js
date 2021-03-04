import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import IonIcons from 'react-native-vector-icons/Ionicons';

import Home from '../containers/Home/Home';
import Search from '../containers/Search/Search';
import My from '../containers/My/My';
import WebView from '../containers/WebView/WebView';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const tabIconConfig = {
  Home: {active: 'home', inactive: 'home-outline'},
  Search: {active: 'fitness', inactive: 'fitness-outline'},
  My: {active: 'person', inactive: 'person-outline'},
};

const HomeStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          const {name} = route;
          const active = focused ? 'active' : 'inactive';
          const iconName = tabIconConfig[name][active];
          return <IonIcons name={iconName} size={20} color={color} />;
        },
      })}
      tabBarOptions={{
        // activeTintColor: '#3479f6',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Home" component={Home} options={{tabBarBadge: 3}} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="My" component={My} />
    </Tab.Navigator>
  );
};

export const StackRouter = (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        // backgroundColor: '#3479f6',
      },
      headerTitleStyle: {
        textAlign: 'left',
      },
    }}>
    <Stack.Screen name="Home" component={HomeStack} options={{title: '首页'}} />
    <Stack.Screen name="WebView" component={WebView} />
  </Stack.Navigator>
);
