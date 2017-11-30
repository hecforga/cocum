import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gql, graphql, compose } from 'react-apollo';
import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';
import DeviceInfo from 'react-native-device-info';
import firebase from 'react-native-firebase';

import { getResultsActiveLevel, getSelectedProductAtLevel } from '../../reducers';
import * as actions from '../../actions';
import * as fromProductsInfo from '../../utilities/productsInfo.js';
import { generateEventLabel } from '../../utilities/googleAnalytics.js';

import ProductDetailModal from './ProductDetailModal.js';

class ProductDetailContainer extends Component {
  componentWillMount() {
    this.buildNumber = parseInt(DeviceInfo.getBuildNumber());

    // react-native-google-analytics_bridge
    this.tracker = new GoogleAnalyticsTracker('UA-106460906-1');
  }

  render() {
    const {
      level,
      activeLevel,
      selectedProduct
    } = this.props;

    return (
      <ProductDetailModal
        level={level}
        activeLevel={activeLevel}
        selectedProduct={selectedProduct}
        onVisitShopPress={() => this.onVisitShopPress()}
        onCocumItPress={() => this.onCocumItPress()}
        onCloseModal={() => this.onCloseModal()}
      />
    );
  }

  onVisitShopPress() {
    const {
      navigation,
      tabName,
      selectedProduct,
      setProductTimesRedirected,
      updateProductTimesRedirectedMutate
    } = this.props;

    const eventParams = {
      tabName: tabName,
      category: selectedProduct.category,
      shop: selectedProduct.shop
    };
    if (this.buildNumber >= 8) {
      firebase.analytics().logEvent('visitShopButton_pressed', eventParams);
    }

    // react-native-google-analytics_bridge
    this.tracker.trackEvent('button_visitShop', 'pressed', { label: generateEventLabel(eventParams) } );

    setProductTimesRedirected(updateProductTimesRedirectedMutate, selectedProduct);

    const url = fromProductsInfo.getProductUrl(selectedProduct);

    this.onCloseModal();

    navigation.navigate('WebView', {
      url
    });
  }

  onCocumItPress() {
    const { navigation, tabName, level, selectedProduct } = this.props;

    const eventParams = {
      tabName: tabName,
      category: selectedProduct.category,
      shop: selectedProduct.shop
    };
    if (this.buildNumber >= 8) {
      firebase.analytics().logEvent('similarButton_pressed', eventParams);
    }

    // react-native-google-analytics_bridge
    this.tracker.trackEvent('button_cocumIt', 'pressed', { label: generateEventLabel(eventParams) } );

    navigation.navigate('Results', {
      category: selectedProduct.category,
      tabName: tabName,
      fetchMode: 'id',
      level: level + 1
    });
  }

  onCloseModal() {
    const { tabName, setSelectedProduct } = this.props;

    setSelectedProduct(tabName, null);
  }
}

const mapStateToProps = (state, ownProps) => ({
  activeLevel: getResultsActiveLevel(state, ownProps.tabName),
  selectedProduct: getSelectedProductAtLevel(state, ownProps.tabName, ownProps.level)
});

const updateProductTimesRedirected = gql`
  mutation updateProductTimesRedirected ($id: ID!, $timesRedirected: Int!) {
    updateProduct(id: $id, timesRedirected: $timesRedirected ) {
      id
    }
  }
`;

export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  graphql(updateProductTimesRedirected, { name: 'updateProductTimesRedirectedMutate' })
)(ProductDetailContainer);