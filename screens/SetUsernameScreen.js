import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { setUsername } from '../features/action/authActions'; // Import setUsername action
import userData from '../features/data/user'; // Import user dummy data
import adminData from '../features/data/admin'; // Import admin dummy data

const SetUsernameScreen = ({ navigation }) => {
  const [username, setUsernameValue] = useState('');
  const dispatch = useDispatch();

  const handleNext = () => {
    // Check if entered email matches user's email or admin's email
    if (username === userData.username) {
      dispatch(setUsername(username)); // Dispatch setUsername action with user's email
      navigation.navigate('SetOtp', { username }); // Navigate to MainComponent for users
    } else if (username === adminData.username) {
      navigation.navigate('SetOtp', { username }); // Navigate to AdminMainComponent for admins
    } else {
      alert('Invalid username'); // Show alert for invalid username
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={username}
        onChangeText={setUsernameValue}
        keyboardType="email-address"
      />
      <Button title="Next" onPress={handleNext} />
    </View>
  );
};

export default SetUsernameScreen;
