import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Constants } from 'expo';
import { Entypo } from '@expo/vector-icons';
import { GoogleAnalyticsTracker, GoogleAnalyticsSettings } from 'react-native-google-analytics-bridge';

import { getTabNameForHomeScreen } from '../utilities/tabsInfo.js';

import MyButton from './common/MyButton.js';

class HomeScreen extends Component {

  componentWillMount() {
    // Recommend you set this much higher in real app! 30 seconds+
    // GoogleAnalyticsSettings has static methods and is applied
    // for all trackers
    GoogleAnalyticsSettings.setDispatchInterval(30);
    this.tracker = new GoogleAnalyticsTracker('UA-106460906-1');
    this.tracker.trackScreenView('Home');

  }

  render() {
    const { navigation } = this.props;



    return (
      <Image
        source={{ uri: 'https://s3.eu-central-1.amazonaws.com/cocumapp/app_assets/home_model_gabardina.jpg' }}
        style={ styles.backgroundImage}>
        <View style={ styles.container }>
          <View style={ styles.topContainer }>
            <View style={styles.logoTopMargin}/>
            <Image
              source= {require('./img/logococum_nombre_bajo_azul.png')}
              resizeMode='contain'
              style={ styles.imageLogo}
            />
          </View>
          <View style={ styles.centerContainer1 }>
            <Text style={ styles.topText }>Encuentra la ropa que</Text>
            <Text style={ styles.topText }>te inspira</Text>
          </View>
          <View style={ styles.centerContainer2 }>
          </View>
          <View style={ styles.bottomContainer }>
            <MyButton
              title='Abre la galería'
              touchableType={'opacity'}
              onPress={() => {
                this.tracker.trackEvent('button', 'pressed', { label: 'gallery'} );

                navigation.navigate('CategorySelection', {
                  tabName: getTabNameForHomeScreen(),
                  imagePickerMode: 'gallery'
                });
              }}
              buttonStyle={[styles.galleryButton, {backgroundColor: '#f0742f', borderColor:'#f0742f'}]}
            />
            <MyButton
              title='Haz una foto'
              touchableType={'opacity'}
              onPress={() => {
                this.tracker.trackEvent('button', 'pressed', { label: 'camera'} );

                navigation.navigate('CategorySelection', {
                    tabName: getTabNameForHomeScreen(),
                    imagePickerMode: 'camera'
                });
              }}
              buttonStyle={[styles.galleryButton, {backgroundColor:'#6683a4', borderColor:'#6683a4'}]}
            />
          </View>
          <View style={ styles.bottomMargin}>
          </View>
        </View>
      </Image>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null
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
    marginTop: Platform.OS === 'android' ? Constants.statusBarHeight : null
  },
  container: {
    flex: 1,
    backgroundColor: '#24333d80',
  },
  topContainer: {
    flex: 0.33,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  topText: {
    fontSize: 24,
    color: 'white',
  },
  centerContainer1: {
    flex: 0.225,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  centerContainer2: {
    flex: 0.245,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
    elevation: 0
  },
  bottomContainer: {
    flex: 0.20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    marginLeft: 24,
    marginRight: 24
  },
  imageLogo: {
    flex:0.9
  },
  logoTopMargin: {
    flex: 0.1
  },
  galleryButton: {
    height: 50,
    paddingLeft: 32,
    paddingRight: 32,
    borderRadius: 25,
    borderWidth: 0.8,
  },
  bottomMargin:{
    flex: 0.05
  }
});

export default HomeScreen;
