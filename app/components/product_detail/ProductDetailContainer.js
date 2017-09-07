import React, { Component } from 'react';
import { Linking } from 'react-native';
import { connect } from 'react-redux';
import { gql, graphql, compose } from 'react-apollo';

import { getResultsActiveLevel, getSelectedProductAtLevel } from '../../reducers';
import * as actions from '../../actions';

import ProductDetailModal from './ProductDetailModal.js';

class ProductDetailContainer extends Component {
  render() {
    const {
      level,
      activeLevel,
      selectedProduct,
      setSelectedProduct
    } = this.props;

    return (
      <ProductDetailModal
        level={level}
        activeLevel={activeLevel}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        onVisitShopPress={() => this.onVisitShopPress()}
        onCocumItPress={() => this.onCocumItPress()}
      />
    );
  }

  onVisitShopPress() {
    const { selectedProduct, setProductTimesRedirected, updateProductTimesRedirectedMutate } = this.props;

    Linking.openURL(selectedProduct.productUrl);
    setProductTimesRedirected(updateProductTimesRedirectedMutate, selectedProduct);
  }

  onCocumItPress() {
    const { navigation, level } = this.props;

    navigation.navigate('Results', {
      category: navigation.state.params.category,
      level: level + 1
    });
  }
}

const mapStateToProps = (state, ownProps) => ({
  activeLevel: getResultsActiveLevel(state),
  selectedProduct: getSelectedProductAtLevel(state, ownProps.level)
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