import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const Card = props => {
  const { width, height } = Dimensions.get("window");
  const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        alignItems: 'center',
        padding: '2%',
        marginBottom: height * 0.02,
        // width: width * 0.80,
        width: width * 0.46,
        height: height * 0.1674
    }
  });

  return <View style={{ ...styles.card, ...props.style }}>{props.children}</View>;
};

export default Card;
