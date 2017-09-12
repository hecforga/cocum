import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { gql, graphql, compose } from 'react-apollo';

import * as actions from '../../actions';
import categories, { getCategoryLabel } from '../../utilities/categoriesInfo.js';

import ProductsHorizontalList from '../common/ProductsHorizontalList.js';
import ProductDetailContainer from '../product_detail/ProductDetailContainer.js';

const CONTAINER_PADDING = 16;
const PRODUCT_THUMBNAIL_CONTAINER_MARGIN = 8;

class ExploreContainer extends Component {
  componentWillMount() {
    const { tabName, setCanGoNext, onResultsWillMount } = this.props;

    const { height, width } = Dimensions.get('window');
    this.imageWidth = (width - 2 * CONTAINER_PADDING - 4 * PRODUCT_THUMBNAIL_CONTAINER_MARGIN) / 2.25;

    setCanGoNext(true);
    onResultsWillMount(tabName);
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


    if (this.isLoading()) {
      return (
        <View style={styles.centeredContainer}>
          <ActivityIndicator size='large' />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={true}
        >
          {queries.map(query => (
            <ProductsHorizontalList
              key={query.queryName}
              title={getCategoryLabel(query.queryName)}
              button={true}
              buttonTitle={'Ver más'}
              onButtonPress={() => this.onShowMorePress(query.queryName)}
              onProductPress={(product) => this.onProductPress(product)}
              products={this.props[query.queryName].allProducts}
              scrollbarStyle={styles.scrollbarStyle}
              imageStyle={{width: this.imageWidth, height: this.imageWidth * 1.2 }}
            />
          ))}
        </ScrollView>
        <ProductDetailContainer navigation={navigation} tabName={tabName} level={level} />
      </View>
    );
  }

  isLoading() {
    return queries.reduce((accumulator, query) => accumulator || this.props[query.queryName].loading, false);
  }

  onShowMorePress(category) {
    const { navigation, tabName, level } = this.props;

    navigation.navigate('Results', {
      tabName: tabName,
      category: category,
      fetchMode: 'random',
      level: level + 1
    });
  }

  onProductPress(product) {
    const { tabName, setSelectedProduct, setProductTimesVisited, updateProductTimesVisitedMutate } = this.props;

    setSelectedProduct(tabName, product);
    setProductTimesVisited(updateProductTimesVisitedMutate, product);
  }
}

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  scrollbarStyle: {
    marginTop:15,
    marginBottom: 15,
    marginLeft:10
  }
});

const excludedShops = ['zara', 'mango', 'pullandbear'];
const queries = categories.map((category) => ({
  query: gql`
    query ${category.name} {
      allProducts(
        orderBy: timesRedirected_DESC,
        first: 5,
        filter: {
          category: "${category.name}",
          shop_not_in: ["${excludedShops.join(`", "`)}"]
        }
      ) {
        id,
        productId,
        imageUrl,
        productUrl,
        price,
        shop,
        timesVisited,
        timesRedirected
      }
    }
  `,
  queryName: category.name
}));


const mapStateToProps = (state, ownProps) => ({
});

export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  ...queries.map(query => graphql(query.query, { name: query.queryName }))
)(ExploreContainer);
