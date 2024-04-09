import React from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/action/authActions';
import { useNavigation } from '@react-navigation/native';

const AdminMainComponent = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogout = async () => {
    // Handle logout logic
    dispatch(logout());
    navigation.navigate('SetOrganization'); 
  };

  const handleGoToHome = () => {
    navigation.navigate('HomeScreen'); // Navigate to home screen
  };

  return (
    <View>
      <Text>Welcome, Admin !</Text>
      <Button title="Logout" onPress={handleLogout} />
      <Button title="Go to Home" onPress={handleGoToHome} />
    </View>
  );
};

export default AdminMainComponent;