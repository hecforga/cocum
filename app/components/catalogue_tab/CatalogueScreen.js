import React, { Component } from 'react';
import { Platform } from 'react-native';
import { Constants } from 'expo';

import { getTabNameForCatalogueScreen } from '../../utilities/tabsInfo.js';

import CatalogueContainer from './CatalogueContainer.js';

class CatalogueScreen extends Component {
  render() {
    const { navigation } = this.props;

    return (
      <CatalogueContainer
        navigation={navigation}
        tabName={getTabNameForCatalogueScreen()}
        level={0}
      />
    )
  }
}

CatalogueScreen.navigationOptions = ({ navigation }) => ({
  title: 'Catálogo',
  headerStyle: Platform.OS === 'android' ? { marginTop: Constants.statusBarHeight } : null
});

export default CatalogueScreen;
