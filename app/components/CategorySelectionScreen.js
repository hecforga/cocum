import React from 'react';
import { Button, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Constants } from 'expo';
import { Entypo, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

import CategorySelectionStateHolder from './CategorySelectionStateHolder.js';

const CategorySelectionScreen = ({ navigation }) => (
  <CategorySelectionStateHolder navigation= {navigation} />
);

CategorySelectionScreen.navigationOptions = ({ navigation }) => ({
  title: 'Recortar',
  index: 1,
  headerRight: (
    <View style={styles.searchButtonWrapper}>
      <View style={styles.searchButtonMargin}/>
      <TouchableOpacity activeOpacity={1} style={styles.searchButton} onPress={ () => navigation.navigate('Results') }> 
        <FontAwesome name='search' style={styles.searchIcon} />
      </TouchableOpacity>
      <View style={styles.searchButtonMargin}/>
    </View>    
  ),
  headerStyle: { marginTop: Constants.statusBarHeight}
});


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
    backgroundColor:'#039be5',
    borderRadius: 5
  },  
  searchIcon: {
    fontSize: 20,
    color: 'white'
  },
  searchButtonMargin:{
    flex:0.20
  }
});

export default CategorySelectionScreen;
