// React and react native imports
import React, { Component } from 'react';
import { View, Button, TouchableOpacity} from 'react-native';

import { FontAwesome } from '@expo/vector-icons';


class StarButton extends Component {

  onPress() {
    const {index, onPress} = this.props;
    onPress(index);
  }

  render() {
    const {starSize, starIconName, starColor,} = this.props;
 
    return (

      <TouchableOpacity
        activeOpacity={0.20}
        style={{
          height: starSize,
          width: starSize,
        }}
        onPress={() => this.onPress()}
      >
        <FontAwesome
          name={starIconName}
          size={starSize}
          color={starColor}
        />
      </TouchableOpacity>
    );
  }
}

export default StarButton;