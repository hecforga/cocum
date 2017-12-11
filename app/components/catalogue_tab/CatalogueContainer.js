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
    const {
      navigation,
      tabName,
      level,
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.scrollViewContainerStyle}>
          <ScrollView
            showsVerticalScrollIndicator={false}
          >
            {categories.map(category => (
              <TouchableOpacity
                key={getCategoryLabel(category.name)}
                onPress={() => this.onShowMorePress(category.name)}
              >
                <View style={[styles.categoryButtonStyle,{height: this.categoryButtonHeight, marginTop:this.categoryButtonHeight/5.5}]}>
                  <Text style={[styles.categoryName, {marginLeft: this.categoryButtonHeight/6}]}>{getCategoryLabel(category.name).toUpperCase()}</Text>
                  <Image 
                    style={[styles.categoryImageStyle,{height: this.categoryButtonHeight}]}
                    source={category.image} 
                    resizeMode='contain'
                  />             
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>        
        </View>        
      </View>
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
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
  },
  scrollViewContainerStyle: {
    flex: 0.9,
  },
  categoryButtonStyle: {
    width: null,
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
  categoryImageStyle: {
    flex:0.5,
  },
});


export default connect(
    null,
    actions
  )(CatalogueContainer);