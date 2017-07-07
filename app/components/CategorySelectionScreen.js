import React from 'react';
import { Button, StyleSheet, View, TouchableHighlight } from 'react-native';
import { Constants } from 'expo';
import { Entypo, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import ActionButton from 'react-native-action-button';

import CategorySelectionStateHolder from './CategorySelectionStateHolder.js';

const CategorySelectionScreen = ({ navigation }) => (
  <CategorySelectionStateHolder />
);

CategorySelectionScreen.navigationOptions = ({ navigation }) => ({
  title: 'Selecciona una categoría',
  headerRight: (
    <TouchableHighlight style={{backgroundColor:'blue'}} onPress={ () => navigation.navigate('Results') }> 
      <FontAwesome name='search' style={styles.actionButtonIcon} />
    </TouchableHighlight>    
  ),
  headerStyle: { marginTop: Constants.statusBarHeight, zIndex:0, elevation:0 }
});


const styles = StyleSheet.create({
  
  actionButtonIcon: {
    fontSize: 15,
    color: 'black'
  }
});

export default CategorySelectionScreen;
