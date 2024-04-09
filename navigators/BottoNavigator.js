import React from 'react';
import { Image, Dimensions, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainComponent from '../screens/MainComponent';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { width, height } = Dimensions.get('window');
  const tabBarActiveColor = '#00ADEF'; // Active tab color

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabel: '', // Hide tab labels
        tabBarIcon: ({ color, size }) => {
          let iconSource;

          switch (route.name) {
            case 'Home':
              iconSource = require('../assets/images/icons/home.png');
              break;
            case 'Category':
              iconSource = require('../assets/images/icons/menu.png');
              break;
            case 'Settings':
              iconSource = require('../assets/images/icons/publish.png');
              break;
            case 'Profile':
              iconSource = require('../assets/images/icons/pie.png');
              break;
            case 'Favorites':
              iconSource = require('../assets/images/icons/menu1.png');
              break;
            default:
              iconSource = require('../assets/images/icons/home.png');
              break;
          }

          return (
            <Image
              source={iconSource}
              style={{
                width: width > 600 ? 27 : 24,
                height: width > 600 ? 27 : 24,
                tintColor: color,
              }}
            />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: tabBarActiveColor,
        inactiveTintColor: 'rgba(218, 218, 218, 1)',
        tabBarStyle: {
          height: height > 800 ? height * 0.077 : height * 0.087,
          width: width * 0.797,
          borderRadius: 16,
          marginBottom: height * 0.029,
          marginTop: height * 0.0133,
          elevation: 6,
          shadowColor: `rgba(0, 0, 0, ${width > 600 ? 0.3 : 0.5})`,
          alignSelf: 'center',
          borderTopColor:
            Platform.OS !== 'ios' ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0)',
          paddingTop:
            Platform.OS === 'ios'
              ? Platform.isPad
                ? height * 0.02
                : height * 0.046
              : height * 0.018,
          shadowOpacity: 0.26,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 8,
        },
      }}
    >
      <Tab.Screen name="Home" component={MainComponent} />
      <Tab.Screen name="Category" component={MainComponent} />
      <Tab.Screen name="Settings" component={MainComponent} />
      <Tab.Screen name="Profile" component={MainComponent} />
      <Tab.Screen name="Favorites" component={MainComponent} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
