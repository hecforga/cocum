import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Entypo, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

const HeaderButton = ({ iconName, iconSize, onPress, canGoNext }) => (
  <View style={styles.searchButtonWrapper}>
    <View style={styles.searchButtonMargin}/>
    <TouchableOpacity
      activeOpacity={1}
      style={[styles.searchButton, {backgroundColor: getTouchableOpacityBackgroundColor(canGoNext)}]}
      onPress={() => handleOnPress(canGoNext, onPress)}
    >
      <FontAwesome name={iconName} style={[styles.searchIcon, {fontSize: iconSize}]} />
    </TouchableOpacity>
    <View style={styles.searchButtonMargin}/>
  </View>
);

const handleOnPress = (canGoNext, onPress) => {
  if (canGoNext) {
    onPress();
  }
};

const getTouchableOpacityBackgroundColor = (canGoNext) => (
  canGoNext ? '#039be5' : '#cfd8dc'
)

const styles = StyleSheet.create({
  searchButtonWrapper:{
    flex:1,
    marginRight:5,
    marginLeft:5,
    backgroundColor:'white'
  },
  searchButton:{
    flex:0.60,
    marginRight:5,
    marginLeft:5,
    width:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 5
  },
  searchIcon: {
    color: 'white'
  },
  searchButtonMargin:{
    flex:0.20
  }
});

export default HeaderButton;