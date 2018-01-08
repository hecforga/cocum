import React, { Component } from 'react';
import { Platform } from 'react-native';
import { Constants } from 'expo';

import FiltersContainer from './FiltersContainer.js';

class FiltersScreen extends Component {
  render() {
    const { navigation } = this.props;

    return (
      <FiltersContainer
        navigation={navigation}
        tabName={navigation.state.params.tabName}
        level={navigation.state.params.level}
      />
    );
  }
}

FiltersScreen.navigationOptions = ({ navigation }) => ({
  title: 'Filtros',
  headerStyle: Platform.OS === 'android' ? { marginTop: Constants.statusBarHeight } : null,
  tabBarVisible: false
});

export default FiltersScreen;
