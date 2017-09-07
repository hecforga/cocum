import React from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Constants } from 'expo';
import { Entypo } from '@expo/vector-icons';

import MyButton from './common/MyButton.js';

const HomeScreen = ({ navigation }) => (
  <Image 
    source={require('./img/palms.jpg')} 
    style={ styles.backgroundImage}>
    <View style={styles.backgroundMargin}/>
    <View style={ styles.container }>
      <View style={ styles.topContainer }>
        <View style={styles.logoTopMargin}/> 
        <Image 
          source= {require('./img/logococum.png')} 
          style={ styles.imageLogo}
        />
      </View>
      <View style={ styles.centerContainer1 }>
        <Text style={ styles.topText }>Encuentra la ropa que</Text>
        <Text style={ styles.topText }>te inspira</Text>
      </View> 
      <View style={ styles.centerContainer2 }>
        <Text style={ styles.centerText }>¡Elige una foto!</Text>
      </View>    
      <View style={ styles.bottomContainer }>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.galleryButton} 
          onPress={() => navigation.navigate('CategorySelection', { imagePickerMode: 'gallery' })}>
          <Entypo
            name='images'
            size={56}
            style={styles.galleryIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.galleryButton}
          onPress={() => navigation.navigate('CategorySelection', { imagePickerMode: 'camera' })}>
          <Entypo
            name='camera'
            size={56}
            style={styles.galleryIcon} />
        </TouchableOpacity>
      </View>
      <View style={ styles.bottomMargin}>
      </View>
    </View>
    <View style={styles.backgroundMargin}/>
  </Image>
);


HomeScreen.navigationOptions = {
  title: 'Cocum',
  headerStyle: Platform.OS === 'android' ? { marginTop: Constants.statusBarHeight } : null
};

const styles = StyleSheet.create({
  backgroundImage:{
    flex: 1,
    flexDirection:'row',
    width: undefined,
    height: undefined,
    backgroundColor:'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundMargin:{
    flex:0.075
  },
  container: {
    flex: 0.85,
    backgroundColor: '#f5f5f5'
  },
  topContainer: {
    flex: 0.375,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  topText: {
    fontSize: 24
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
    flex: 0.125,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 24,
    marginRight: 24
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#039be5', //03a9f4,
    borderRadius: 5,
    borderWidth: 0.8,
    borderColor: '#01579b',
    paddingLeft: 32,
    paddingRight: 32
  },
  galleryIcon:{
    color: 'white'
  },
  bottomMargin:{
    flex: 0.05
  }
});


export default HomeScreen;
