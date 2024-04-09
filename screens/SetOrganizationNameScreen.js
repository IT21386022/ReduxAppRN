import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import userData from '../features/data/user'; // Import user dummy data
import adminData from '../features/data/admin'; // Import admin dummy data

const SetOrganizationNameScreen = ({ navigation }) => {
  const [organizationName, setOrganizationName] = useState('');

  const handleNext = () => {
    // Check if organization name matches expected value
    if (organizationName.trim().toLowerCase() === 'dnata') {
      navigation.navigate('SetUsername');
    } else {
      alert('Invalid organization name. Please enter a valid organization name.');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Organization Name"
        value={organizationName}
        onChangeText={setOrganizationName}
      />
      <Button title="Next" onPress={handleNext} />
    </View>
  );
};

export default SetOrganizationNameScreen;
