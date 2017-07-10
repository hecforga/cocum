import React from 'react';
import { Button, StyleSheet, View, TouchableHighlight } from 'react-native';
import { Constants } from 'expo';
import { Entypo, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

import CategorySelectionStateHolder from './CategorySelectionStateHolder.js';

const CategorySelectionScreen = ({ navigation }) => (
  <CategorySelectionStateHolder />
);

CategorySelectionScreen.navigationOptions = ({ navigation }) => ({
  title: 'Selecciona una categoría',
  headerRight: (
    <View style={styles.searchButtonWrapper}>
      <View style={styles.searchMargin}/>
      <TouchableHighlight style={styles.searchButton} onPress={ () => navigation.navigate('Results') }> 
        <FontAwesome name='search' style={styles.searchIcon} />
      </TouchableHighlight>
      <View style={styles.searchMargin}/>
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
    backgroundColor:'#03a9f4',
    borderRadius: 5
  },  
  searchIcon: {
    fontSize: 20,
    color: 'black'
  },
  searchMargin:{
    flex:0.20
  }
});

export default CategorySelectionScreen;
