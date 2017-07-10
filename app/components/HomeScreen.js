import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Button, Image } from 'react-native';
import { Constants } from 'expo';
import { Entypo, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
const HomeScreen = ({ navigation }) => (
  <View style={ styles.container }>
    <View style={ styles.topContainer }>
      <View style={styles.logoTopMargin}/> 
      <Image 
        source= {require('./img/logococum.png')} 
        style={ styles.imageLogo}
      />
    </View>
    <View style={ styles.centerContainer1 }>
      <Text style={ styles.topText }>Encuentra la ropa que te inspira</Text>
    </View> 
    <View style={ styles.centerContainer2 }>
      <Text style={ styles.centerText }>¡Elije una foto!</Text>
    </View>    
    <View style={ styles.bottomContainer }>
      <TouchableHighlight 
        style={styles.galleryButton} 
        onPress={ () => navigation.navigate('CategorySelection') }> 
        <MaterialCommunityIcons
          name='folder-multiple-image'
          size={60}
          style={styles.galleryIcon} />
      </TouchableHighlight>
    </View>
    <View style={ styles.bottomMargin}>
    </View>
  </View>
);


HomeScreen.navigationOptions = {
  title: 'Cocum',
  headerStyle: { marginTop: Constants.statusBarHeight }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  topContainer: {
    flex: 0.35,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  topText: {
    fontSize: 24,
    fontFamily: 'sans-serif-condensed'
  },
  centerContainer1: {
    flex: 0.225,
    alignItems: 'center',
    justifyContent: 'center'
  },
  centerContainer2: {
    flex: 0.225,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
    elevation: 0
  },
  centerText: {
  fontSize: 16
  },
  bottomContainer: {
    flex: 0.15,
    alignItems: 'center'
  },
  imageLogo: {
    flex:0.8,
    resizeMode: 'contain',
    width: undefined, 
    height: undefined,
    alignSelf: 'stretch'
  },
  logoTopMargin: {
    flex: 0.2
  },
  galleryButton: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#03a9f4',
    borderRadius: 5,
    width:110  
  },
  galleryIcon:{
    flex:1,
    color:'black'
  },
  bottomMargin:{
    flex:0.05
  }
});


export default HomeScreen;
