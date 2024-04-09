import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomHeaderButton from '../components/headerbutton'; // Adjust the import path according to your project structure

const CategoryList = () => {
  const navigation = useNavigation();

  const handleGoToHome = () => {
    navigation.navigate('HomeScreen'); // Navigate to home screen
  };

  return (
    <View>
      <CustomHeaderButton title="E Learning" onPress={() => console.log('E Learning pressed')} />
      <CustomHeaderButton title="Library" onPress={() => console.log('Library pressed')} />
      <Text>Welcome, User!</Text>
      <Text>Micro Learning screens</Text>
      <Button title="Go to Home" onPress={handleGoToHome} />
    </View>
  );

};

export default CategoryList;
