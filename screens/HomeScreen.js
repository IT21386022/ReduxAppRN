import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, StyleSheet, Image, ScrollView, TextInput, SafeAreaView, Dimensions, Platform, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';
// import GlobalSearchSection from '../components/GlobalSearchSection';
// import GetInTouchSection from '../components/Dashboard/GetInTouchSection';
//import TileSection from '../components/TitleSection';
import Card from '../components/Card';
import { categoryTileData } from '../features/data/home'
import exampleImage from '../assets/images/icons/dc-reveiew.png'

const HomeScreen = () => {
  const [searchText, setSearchText] = useState('');
  const { width, height, scale } = Dimensions.get('window');
  const styles = stylesHomePageScreen(width, height);
   const chunkedData = chunkArray(categoryTileData, 2);
   const navigation = useNavigation();

   const handleCardPress = (item) => {
    navigation.navigate('CategoryList', { category: item }); // Assuming 'CategoryList' is the screen name for your category list
  };
   
  // const logoUrl =
  //   'https://dnatastaging.i-context.net/NewsPostContents/112996/LogoImage/dC Connect_Artboard 3_20200706035951.png';


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image style={styles.logo} />
      <ScrollView style={{ backgroundColor: 'white' }} showsVerticalScrollIndicator={false}>
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <View style={styles.iconContainer}>
              <Icon name="search-outline" size={20} color={'rgba(88, 150, 139, 1)'} />
            </View>
            <TextInput
              style={styles.search}
              value={searchText}
              placeholder={'What are you looking for today?'}
              onChangeText={text => setSearchText(text)}
            />
          </View>
        </View>
        <View style={styles.cardcontainer}>
          {chunkedData.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.rowContainer}>
              {row.map((item, colIndex) => (
                <Card
                  key={colIndex}
                  style={{ backgroundColor: item.ColorCode, flex: 1, marginRight: colIndex === 0 ? width * 0.05 : 0, marginBottom: height * 0.02 }}
                >
                  <TouchableOpacity
                key={colIndex}
                onPress={() => handleCardPress(item)} 
              >   
                  <View style={styles.iconContainerStyle}>
                            <Image
                                style={styles.iconStyle}
                                resizeMode={'contain'}
                              //   source={{
                              //     uri: item.Url ? item.Url : getImage(item.DisplayText)
                              // }}
                      
                            />
                              <Text maxFontSizeMultiplier={1.2} style={styles.itemTitleStyle}>{item.DisplayText}</Text>
                        </View>
                        </TouchableOpacity>
                </Card>
                
              ))}
            </View>
          ))}
        </View>

        {/* {searchText == '' && (
          <View>
            <View style={styles.slidesContainer1}>
              <TileSection />
            </View>
            <GetInTouchSection />
          </View>
        )} */}

        {/* {searchText !== '' && <GlobalSearchSection result={[]} />} */}
      </ScrollView>
    </SafeAreaView>
  );
};

// Function to chunk an array into smaller arrays of specified size
const chunkArray = (array, size) => {
  const chunkedArray = [];
  for (let i = 0; i < array.length; i += size) {
    chunkedArray.push(array.slice(i, i + size));
  }
  return chunkedArray;
};

const stylesHomePageScreen = (width, height) => {
  return (
    StyleSheet.create({
      searchContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: height * 0.04,
        paddingHorizontal: width > 600 ? width * 0.1 : width * 0.079,
        marginBottom: (height * 0.069) / 2,
        ...(Platform.OS !== 'ios' && {
          alignItems: 'center'
        }),
      },
      imageContainer: {
        height: height > 800 ? height * 0.052 : height * 0.062,
        aspectRatio: 1,
        borderRadius: 16,
        overflow: 'hidden',
        marginRight:'3%'
      },
      image: {
        width: '100%',
        height: '100%',
      },
      searchBox: {
        width: width * 0.85,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 10,
        shadowColor: `rgba(0, 0, 0, ${width > 600 ? 0.3 : 0.5})`,
        borderRadius: 12,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: height > 800 ? height * 0.052 : height * 0.062,
      },
      iconContainer: {
        paddingLeft: '3%',
      },
      search: {
        fontSize: width > 700 ? 18 : 13,
        fontStyle: 'normal',
        fontWeight: '600',
        fontFamily: 'Poppins-Regular',
        marginLeft: '2%',
        width: width * 0.59,
        // marginTop: '1%',
      },
      taskIcon: {
        //width: '20.04%'
      },
      reminderData: {
        paddingRight: '6%',
      },
      reminderHead: {
        fontWeight: '600',
        fontSize: width > 600 ? 19 : 14,
        fontFamily: 'Poppins-SemiBold',
        color: 'rgba(72, 72, 72, 1)',
      },
      venue: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
      },
      cardContainer: {
        marginTop: 10,
        height: 60,
      },
      slidesContainer1: {
        marginTop: (height * 0.069) / 2,
      },
      slidesContainer2: {
        marginTop: height * 0.054,
      },
      logoSection: {
        marginTop: -5,
        padding: 20,
        //borderBottomColor: 'gray',
        // borderBottomWidth: 2,
        shadowOffset: { width: 0, height: 10 },
        shadowColor: '#e2e2e2',
        shadowOpacity: 0.3,
        elevation: 3,
        zIndex: 999,
      },
      logo: {
        ...(Platform.OS === 'ios' && {
          marginTop: height < 800 ? 10 : 10,
          height: height < 800 ? 55 : 85,
        }),
        ...(Platform.OS !== 'ios' && {
          height: width * 0.3,
          marginTop: height < 800 ? 10 : 5,
        }),
        width: width * 0.9,
        ...(Platform.isPad && {
          height: 200,
          marginTop: height < 800 ? 10 : 5,
          width: 600
        }),
        resizeMode: 'contain',
        alignSelf: 'center',
      },
      cardcontainer: {
        // flex: 1,
        // paddingHorizontal: Dimensions.get('window').width * 0.02,
        // paddingVertical: Dimensions.get('window').height * 0.02,
        paddingHorizontal: width * 0.02,
        width: '100%',
      },
      rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between ',
        marginHorizontal: width * 0.05, // Adjust this value for equal spaces at start and end
        marginBottom: '3%',
        flexWrap: 'wrap',
      },
      itemTitleStyle: {
        fontWeight: '500',
        fontSize: width > 600 ? 20 : width > 376 ? 15: 12,
        fontFamily: 'Poppins-SemiBold',
        color: 'white',
        marginTop: 5,
    },
    iconStyle: {
      // width: '100%',
      height: '80%',
      aspectRatio: 1.2
  },
  iconContainerStyle: {
      alignItems: 'center',
      height: '65.5%',
      paddingTop: '10.16%'
  },
    })
  )
} 

export default HomeScreen;





