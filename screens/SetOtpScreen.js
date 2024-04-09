import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { setOTP } from '../features/action/authActions'; // Import setOTP action
import userData from '../features/data/user'; // Import user dummy data
import adminData from '../features/data/admin'; // Import admin dummy data

const SetOtpScreen = ({ navigation, route }) => {
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();

  const handleNext = () => {
    // Check if entered OTP matches user's OTP or admin's OTP
    if (route.params?.username === userData.username && otp === userData.otp.toString()) { // Convert userData.otp to string for comparison
      dispatch(setOTP(otp)); // Dispatch setOTP action
      navigation.navigate('Main'); // Navigate to MainComponent for users
    } else if (route.params?.username === adminData.username && otp === adminData.otp.toString()) { // Convert adminData.otp to string for comparison
      dispatch(setOTP(otp));
      navigation.navigate('AdminMain'); // Navigate to AdminMainComponent for admins
    } else {
      Alert.alert('Invalid OTP', 'Please enter a valid OTP.'); // Show alert for invalid OTP
    }
  };

  return (
    <View>
      <TextInput
        placeholder="OTP"
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
      />
      <Button title="Next" onPress={handleNext} />
    </View>
  );
};

export default SetOtpScreen;

