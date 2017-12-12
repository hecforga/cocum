import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, TouchableHighlight, Text } from 'react-native';
import * as icons from '@expo/vector-icons';

class MyButton extends Component {
  render() {
    const {
      containerStyle,
      buttonStyle,
      iconStyle,
      textStyle,
      touchableType,
      onPress,
      title,
      iconFamily,
      iconName,
      iconColor,
      disabled,
      noBackground
    } = this.props;

    const buttonStyles = [styles.button];
    const textStyles = [styles.text];
    const iconStyles = [styles.icon];
    if (iconName) {
      buttonStyles.push({ padding: 2 });
    }
    if (buttonStyle) {
      buttonStyles.push(buttonStyle);
    }
    if (textStyle) {
      textStyles.push(textStyle);
    }
    if (iconStyle) {
      iconStyles.push(iconStyle);
    }

    if (disabled) {
      if (!noBackground) {
        buttonStyles.push(styles.buttonDisabled);
      }
      textStyles.push(styles.textDisabled);
      iconStyles.push(styles.iconDisabled);
    }

    let Touchable = TouchableOpacity;
    if (touchableType && touchableType === 'highlight') {
      Touchable = TouchableHighlight;
    }

    let IconComponent = icons.FontAwesome;
    if (iconFamily) {
      IconComponent = icons[iconFamily];
    }

    return (
      <Touchable
        disabled={disabled}
        onPress={onPress}
        style={containerStyle}
      >
        <View style={buttonStyles}>
          {iconName ?
            <IconComponent name={iconName} color={iconColor || 'white'} style={iconStyles} />
            :
            <Text style={textStyles} disabled={disabled}>{title.toUpperCase()}</Text>
          }
        </View>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#6683a4',
    padding: 8,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '500'
  },
  icon: {
    fontSize: 32
  },
  buttonDisabled: {
    backgroundColor: '#dfdfdf'
  },
  textDisabled: {
    color: '#a1a1a1'
  },
  iconDisabled: {
    opacity: 0.38
  }
});

export default MyButton;