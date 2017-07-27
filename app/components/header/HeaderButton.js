import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const HeaderButton = ({ iconName, title, onPress, canGoNext }) => (
  <View style={styles.buttonWrapper}>
    <TouchableOpacity
      activeOpacity={1}
      style={[styles.button, {backgroundColor: getTouchableOpacityBackgroundColor(canGoNext)}]}
      onPress={() => handleOnPress(canGoNext, onPress)}
    >
      {iconName ?
        <FontAwesome name={iconName} style={styles.icon} />
          :
        <Text style={[styles.title, {color: getTextColor(canGoNext)}]}>{title}</Text>}
    </TouchableOpacity>
  </View>
);

const handleOnPress = (canGoNext, onPress) => {
  if (canGoNext) {
    onPress();
  }
};

const getTouchableOpacityBackgroundColor = (canGoNext) => (
  canGoNext ? '#039be5' : '#cfd8dc'
);

const getTextColor = (canGoNext) => (
  canGoNext ? 'white' : '#a1a1a1'
);

const styles = StyleSheet.create({
  buttonWrapper:{
    marginRight: 8,
  },
  button:{
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    padding: 2,
    minWidth: 80
  },
  icon: {
    color: 'white',
    fontSize: 32
  },
  title: {
    textAlign: 'center',
    padding: 8,
    fontWeight: '500'
  }
});

export default HeaderButton;