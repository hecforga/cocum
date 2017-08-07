// React and react native imports
import { StyleSheet, View} from 'react-native';

import React, { Component } from 'react';

// Local file imports
import StarButton from './StarButton';


class ResultsRatingBar extends Component {

  render() {
    const{ givenRating, onPress} = this.props
    let starsLeft = givenRating;
    let starButtons = [];

    for (let i = 0; i < 5; i++) {
      let starIconName = 'star-o';
      let starColor = 'gray';

      if (starsLeft >= 1) {
        starIconName = 'star';
        starColor = '#fbc02d';
      }

      starButtons.push(
        <StarButton
          activeOpacity={0.20}
          key={i}
          index={i+1}
          onPress={onPress}
          starSize={40}
          starIconName={starIconName}
          starColor={starColor}
        />
      );
      starsLeft--;
    }

    return (
      <View style={styles.starRatingContainer}>
        {starButtons}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  starRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ResultsRatingBar;