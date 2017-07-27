import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const HeaderButton = ({ iconName, onPress, canGoNext }) => (
  <View style={styles.buttonWrapper}>
    <View style={styles.buttonMargin}/>
    <TouchableOpacity
      activeOpacity={1}
      style={[styles.button, {backgroundColor: getTouchableOpacityBackgroundColor(canGoNext)}]}
      onPress={() => handleOnPress(canGoNext, onPress)}
    >
      <FontAwesome name={iconName} style={styles.icon} />
    </TouchableOpacity>
    <View style={styles.buttonMargin}/>
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
  buttonWrapper:{
    flex: 1,
    marginRight: 5,
    marginLeft: 5
  },
  button:{
    flex: 0.60,
    marginRight: 5,
    marginLeft: 5,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  icon: {
    color: 'white',
    fontSize: 24
  },
  buttonMargin:{
    flex: 0.20
  }
});

export default HeaderButton;