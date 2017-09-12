import React, { Component } from 'react';
import { Linking } from 'react-native';
import { connect } from 'react-redux';
import { gql, graphql, compose } from 'react-apollo';

import { getResultsActiveLevel, getSelectedProductAtLevel } from '../../reducers';
import * as actions from '../../actions';
import * as fromProductsInfo from '../../utilities/productsInfo.js';

import ProductDetailModal from './ProductDetailModal.js';

class ProductDetailContainer extends Component {
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
    const { selectedProduct, setProductTimesRedirected, updateProductTimesRedirectedMutate } = this.props;

    Linking.openURL(fromProductsInfo.getProductUrl(selectedProduct));
    setProductTimesRedirected(updateProductTimesRedirectedMutate, selectedProduct);
  }

  onCocumItPress() {
    const { navigation, tabName, level, selectedProduct } = this.props;

    navigation.navigate('Results', {
      category: selectedProduct.category || 'punto', // TODO: Remove || 'punto' when updating Grapchcool
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