import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Button, Image } from 'react-native';
import { Constants } from 'expo';
import { Entypo, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import ActionButton from 'react-native-action-button';

const HomeScreen = ({ navigation }) => (
  <View style={ styles.container }>
    <View style={ styles.topContainer }>
      <View style={styles.topBlankSpace}/> 
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
      <TouchableHighlight onPress={ () => navigation.navigate('Results') }> 
        <FontAwesome name='search' style={styles.actionButtonIcon} />
      </TouchableHighlight> 
      <ActionButton 
        buttonColor="rgba(231,76,60,1)"
        elevation={1000}
        zIndex={5}
        icon= {
          <MaterialCommunityIcons
          name='folder-multiple-image'
          size={50} style={styles.actionButtonIcon} /> 
        }
        onPress={ () => navigation.navigate('CategorySelection') }      
      >     
      </ActionButton>
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
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  topText: {
    fontSize: 24,
    fontFamily: 'sans-serif-condensed'
  },
  centerContainer1: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  centerContainer2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
    elevation: 0
  },
  centerText: {
  fontSize: 16
  },
  bottomContainer: {
    flex: 1,
    alignItems: 'center'
  },
  imageLogo: {
    flex:0.8,
    resizeMode: 'contain',
    width: undefined, 
    height: undefined,
    alignSelf: 'stretch'
  },
  topBlankSpace: {
    flex: 0.2
  }
});


export default HomeScreen;
