import React, { Component } from 'react';
import { Platform } from 'react-native';
import { Constants } from 'expo';

import CategorySelectionContainer2 from './CategorySelectionContainer.js';
import HeaderButtonContainer from '../header/HeaderButtonContainer.js';

class CategorySelectionScreen extends Component {
  render() {
    const { navigation } = this.props;

    return (
      <CategorySelectionContainer2 navigation={navigation} />
    );
  }
}

CategorySelectionScreen.navigationOptions = ({ navigation }) => ({
  title: 'Recortar',
  headerRight: (
    <HeaderButtonContainer
      title='Buscar'
      onPress={(state) => {
        navigation.navigate('Results', {
          tabName: navigation.state.params.tabName,
          category: state.query.category,
          fetchMode: 'url',
          level: 0
        });
      }}
      isDisabled={(state) => !state.canGoNext}
      buttonStyle={{ minWidth: 80 }}
      containerStyle={{ marginRight: 8 }}
    />
  ),
  headerStyle: Platform.OS === 'android' ? { marginTop: Constants.statusBarHeight } : null,
  tabBarVisible: false
});

export default CategorySelectionScreen;