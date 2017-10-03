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
    // for testing:means no data will be sent to GA
    //GoogleAnalyticsSettings.setDryRun(true);
    // The tracker is constructed
    this.tracker = new GoogleAnalyticsTracker('UA-106460906-1');
    this.tracker.trackScreenView('Home');

  }

  render() {
    const { navigation } = this.props;



    return (
      <Image
        source={{ uri: 'https://s3.eu-central-1.amazonaws.com/cocumapp/app_assets/home_background.jpg' }}
        style={ styles.backgroundImage}>
        <View style={styles.backgroundMargin}/>
        <View style={ styles.container }>
          <View style={ styles.topContainer }>
            <View style={styles.logoTopMargin}/>
            <Image
              source= {require('./img/logococum.png')}
              resizeMode='contain'
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
            <MyButton
              iconName='images'
              iconFamily='Entypo'
              iconStyle={{ fontSize: 56 }}
              touchableType={'opacity'}
              onPress={() => {
                this.tracker.trackEvent('button', 'pressed', { label: 'gallery'} );

                navigation.navigate('CategorySelection', {
                  tabName: getTabNameForHomeScreen(),
                  imagePickerMode: 'gallery'
                });
              }}
              buttonStyle={styles.galleryButton}
            />
            <MyButton
              iconName='camera'
              iconFamily='Entypo'
              iconStyle={{ fontSize: 56 }}
              touchableType={'opacity'}
              onPress={() => {
                this.tracker.trackEvent('button', 'pressed', { label: 'camera'} );

                navigation.navigate('CategorySelection', {
                    tabName: getTabNameForHomeScreen(),
                    imagePickerMode: 'camera'
                });
              }}
              buttonStyle={styles.galleryButton}
            />
          </View>
          <View style={ styles.bottomMargin}>
          </View>
        </View>
        <View style={styles.backgroundMargin}/>
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
  backgroundMargin:{
    flex:0.075
  },
  container: {
    flex: 0.85,
    backgroundColor: '#fafafa'
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
    justifyContent: 'flex-end'
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
    flex:0.8
  },
  logoTopMargin: {
    flex: 0.2
  },
  galleryButton: {
    flex: 1,
    paddingLeft: 32,
    paddingRight: 32,
    borderRadius: 5,
    borderWidth: 0.8,
    borderColor: '#01579b'
  },
  galleryIcon:{
    color: 'white'
  },
  bottomMargin:{
    flex: 0.05
  }
});

export default HomeScreen;
