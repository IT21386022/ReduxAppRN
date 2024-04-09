import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { CacheImage } from '../UI/CacheImage';

const Item = props => {
    const { width, height } = Dimensions.get("window");
    const styles = stylesItem(width, height);
    return (
        <TouchableOpacity
            activeOpacity={0.6}
            style={(props.index % 2 == 1) ? { ...styles.itemContainer1, backgroundColor: props.tileColor } : { ...styles.itemContainer2, backgroundColor: props.tileColor }}
            onPress={() => props.onNavigate({
                category: props.categoryTitle,
                menuTitle: 'Main'
            })}
        >
            {props.children}
        </TouchableOpacity>
    );
}

const TitleSection = props => {
    const tileList = useSelector(state => state.article.categoryTiles);

    const { width, height } = Dimensions.get("window");
    const styles = stylesTileSection(width, height);

    const getImage = (DisplayText) => {
        if (DisplayText.toLowerCase() == 'News'.toLowerCase()) {
            // return 'https://dnatastaging.i-context.net/NewsPostContents/TempContent/news_20220922121819.png'
            return require('../../assets/images/icons/home.png')
        } else if (DisplayText.toLowerCase() == 'DC Review'.toLowerCase()) {
            return 'https://dnatastaging.i-context.net/NewsPostContents/TempContent/open-book_20220919140722.png'
        } else if (DisplayText.toLowerCase() == 'Culinary Corner'.toLowerCase()) {
            return 'https://dnatastaging.i-context.net/NewsPostContents/TempContent/culinary_20220922121908.png'
        } else if (DisplayText.toLowerCase() == 'Safety'.toLowerCase()) {
            return 'https://dnatastaging.i-context.net/NewsPostContents/TempContent/safety_20220922121955.png'
        } else if (DisplayText.toLowerCase() == 'People & Culture'.toLowerCase()) {
            return 'https://dnatastaging.i-context.net/NewsPostContents/TempContent/people_20220922122736.png'
        } else if (DisplayText.toLowerCase() == 'Training'.toLowerCase()) {
            return 'https://dnatastaging.i-context.net/NewsPostContents/TempContent/puzzle_20220922122823.png'
        }
    }

    return (
        <View style={styles.newsCardContainer}>
            {tileList && <View style={styles.rawStyle}>
                {tileList.map((event, index) => (
                    <Item
                        key={event.DisplayText + index}
                        tileColor={event.ColorCode}
                        index={index}
                        categoryTitle={event.DisplayText}
                        onNavigate={(data) => props.onNavigate(data)}
                    >
                        <View style={styles.iconContainerStyle}>
                            <Image
                                style={styles.iconStyle}
                                resizeMode={'contain'}
                                source={{
                                    uri: event.Url ? event.Url : getImage(event.DisplayText)
                                }}
                            />
                              <Text maxFontSizeMultiplier={1.2} style={styles.itemTitleStyle}>{event.DisplayText}</Text>
                        </View>
                      
                    </Item>
                ))}
            </View>}
        </View>
    );
};

const stylesTileSection = (width, height) => {

    return (
        StyleSheet.create({
            newsCardContainer: {
                width: '100%',
            },
            title: {
                fontWeight: '500',
                fontSize: width > 600 ? 23 : 18,
                fontFamily: 'Poppins-Medium',
                color: 'rgba(69, 65, 65, 1)'
            },
            titleContainer: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: width * 0.042,
                marginBottom: '3%'
            },
            listContainer: {
                marginLeft: width * 0.037
            },
            rawStyle: {
                flexDirection: 'row',
                justifyContent: 'flex-start',
                width: '88%',
                // marginLeft:width*0.063,
                alignSelf: 'center',
                marginBottom: 16,
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

const stylesItem = (width, height) => {
    return (
        StyleSheet.create({
            itemContainer1: {
                borderRadius: 10,
                alignItems: 'center',
                padding: '2%',
                marginBottom: height * 0.02,
                width: width * 0.41,
                height: height * 0.1674
            },
            itemContainer2: {
                borderRadius: 10,
                alignItems: 'center',
                padding: '2%',
                marginBottom: height * 0.02,
                marginRight: width * 0.0487,
                width: width * 0.41,
                height: height * 0.1674
            },
        })
    )
}

export default TitleSection;