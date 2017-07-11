import React from 'react';
import { Button, StyleSheet, View, TouchableOpacity} from 'react-native';
import { Constants } from 'expo';
import { Entypo, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

import ResultsStateHolder from './ResultsStateHolder.js';

const ResultsScreen = ({ navigation }) => (
  <ResultsStateHolder />
);

ResultsScreen.navigationOptions = ({ navigation }) => ({
  title: 'Resultados',
  index: 2,
  headerRight: (
    <View style={styles.homeButtonWrapper}>
      <View style={styles.homeButtonMargin}/>
      <TouchableOpacity 
        activeOpacity={1}
        style={styles.homeButton} 
        onPress={() => {
          navigation.goBack();
          navigation.goBack(null);
          navigation.navigate('Home');
        }}> 
        <FontAwesome name='home' style={styles.homeIcon} />
      </TouchableOpacity>
      <View style={styles.homeButtonMargin}/>
    </View>),
  headerStyle: { marginTop: Constants.statusBarHeight }
});

const styles = StyleSheet.create({
  homeButtonWrapper:{
    flex:1,
    marginRight:5,
    marginLeft:5,
    backgroundColor:'white'
  },
  homeButton:{
    flex:0.60,
    marginRight:5,
    marginLeft:5,
    width:50,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#039be5',
    borderRadius: 5
  },  
  homeIcon: {
    fontSize: 30,
    color: 'white'
  },
  homeButtonMargin:{
    flex:0.20
  }
});

export default ResultsScreen;
