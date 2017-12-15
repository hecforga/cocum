import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';

import * as actions from '../../actions';
import categories, { getCategoryLabel } from '../../utilities/categoriesInfo.js';
import { generateEventLabel } from '../../utilities/googleAnalytics.js';

class CatalogueContainer extends Component {
  componentWillMount() {
    const { tabName, setCanGoNext, onResultsWillMount } = this.props;

    const { height, width } = Dimensions.get('window');
    this.categoryButtonHeight = height/2.3 - height/4;

    setCanGoNext(true);
    onResultsWillMount(tabName);

    this.tracker = new GoogleAnalyticsTracker('UA-106460906-1');
  }

  componentWillUnmount() {
    const { tabName, onResultsWillUnmount } = this.props;
    onResultsWillUnmount(tabName);
  }

  render() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={true}
        style={styles.container}
      >
        {categories.map((category, index) => (
          <TouchableOpacity
            key={getCategoryLabel(category.name)}
            onPress={() => this.onShowMorePress(category.name)}
            delayPressIn={100}
          >
            <View
              style={[styles.categoryButton, {
                height: this.categoryButtonHeight,
                marginTop: index === 0 ? this.categoryButtonHeight / 5.5 : 0,
                marginBottom: this.categoryButtonHeight / 5.5
              }]}
            >
              <Text style={[styles.categoryName, { marginLeft: this.categoryButtonHeight / 6 }]}>
                {getCategoryLabel(category.name).toUpperCase()}
              </Text>
              <Image
                style={[styles.categoryImage, { height: this.categoryButtonHeight }]}
                source={category.image}
                resizeMode='contain'
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }

  onShowMorePress(category) {
    const { navigation, tabName, level } = this.props;

    const labelData = {
      category: category,
    };
    this.tracker.trackEvent('button_categoryShowMore', 'pressed', { label: generateEventLabel(labelData) } );

    navigation.navigate('Results', {
      tabName: tabName,
      category: category,
      fetchMode: 'random',
      level: level + 1
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16
  },
  categoryButton: {
    flexDirection: 'row',
    backgroundColor: '#6683a4',
    alignItems: 'center',
    borderRadius: 5,
  },
  categoryName: {
    flex:0.5,
    color: 'white',
    fontWeight: '500'
  },
  categoryImage: {
    flex:0.5,
  },
});


export default connect(
    null,
    actions
  )(CatalogueContainer);