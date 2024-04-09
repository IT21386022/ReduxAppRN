import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store/Authstore';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainComponent from './screens/MainComponent';
import SetUsernameScreen from './screens/SetUsernameScreen';
import SetOtpScreen from './screens/SetOtpScreen';
import AdminMainComponent from './screens/AdminMainComponent';
import SetOrganizationNameScreen from './screens/SetOrganizationNameScreen';
import HomeScreen from './screens/HomeScreen';
import CategoryList from './screens/CategoryList';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SetOrganization">
          <Stack.Screen name="SetOrganization" component={SetOrganizationNameScreen} />
          <Stack.Screen name="SetUsername" component={SetUsernameScreen} />
          <Stack.Screen name="SetOtp" component={SetOtpScreen} />
          <Stack.Screen name="Main" component={MainComponent} />
          <Stack.Screen name="AdminMain" component={AdminMainComponent} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="CategoryList" component={CategoryList} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;


