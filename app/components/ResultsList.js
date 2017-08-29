import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, ScrollView, Image, Text, Dimensions, Linking } from 'react-native';
import { gql, graphql } from 'react-apollo';

const CONTAINER_PADDING = 16;
const PRODUCT_CONTAINER_MARGIN = 8;

class ResultsList extends Component {

  componentWillMount() {
    const { height, width } = Dimensions.get('window');
    this.imageWidth = (width - 2 * CONTAINER_PADDING - 4 * PRODUCT_CONTAINER_MARGIN) / 2;
    this.imageWidth = this.imageWidth | 0;
    this.resultsProductUrl = [];//para la beta

  }
  componentDidMount() {
    this.setQueryResultsList(this.resultsProductUrl);//para la beta
  }

  render() {
    const {ids, data} = this.props;

    if (data.loading) {
      return <Text>Cargando...</Text>
    }

    const productsInArraysOf2 = [];
    let aux = [];
    let count = 0;
    ids.forEach((id) => {
      const product = data.allProducts.find((p) => p.productId === id);
      aux.push(product);
      this.resultsProductUrl.push(product.productUrl);//para la beta 
      if (count % 2 === 1) {
        productsInArraysOf2.push(aux);
        aux = [];
      }
      count++;
    });    

    return (
      <ScrollView style={styles.container}>
        {productsInArraysOf2.map((arrayOf2Products, index) =>
          <View
            key={index}
            style={styles.listRow}
          >
            {arrayOf2Products.map((product) =>
              <TouchableHighlight
                key={product.productId}
                style={{ margin: PRODUCT_CONTAINER_MARGIN, width: this.imageWidth }}
                onPress={() => { this.setProductTimesVisited(product); Linking.openURL(product.productUrl); }}
              >
                <View style={styles.productContainer}>
                  <Image source={{ uri: product.imageUrl }} style={{ width: this.imageWidth, height: this.imageWidth * 1.2 }} />
                  <Text>{product.shop.toUpperCase()}</Text>
                  <Text style={styles.price}>{product.price + ' €'}</Text>
                </View>
              </TouchableHighlight>
            )}
          </View>
        )}
      </ScrollView>
    );
  }


  //para la beta
  setQueryResultsList(resultsProductUrl){
    const { setQueryResultsList } = this.props;
    setQueryResultsList(resultsProductUrl);
  }//beta


  setProductTimesVisited(product){
    const { setProductTimesVisited } = this.props;
    let timesVisited = product.timesVisited;
    if(!timesVisited){
      timesVisited = 0;
    }
    timesVisited++;
    setProductTimesVisited(product, timesVisited);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: CONTAINER_PADDING
  },
  listRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  productContainer: {
    backgroundColor: '#e8e8ee'
  },
  price: {
    fontWeight: 'bold'
  }
});

const gqlQuery = gql`query getProductsByIds($ids: [String!]) {
  allProducts(filter: {
    productId_in: $ids
  }) {
    id,
    productId,
    imageUrl,
    productUrl,
    price,
    shop,
    timesVisited
  }
}`;

const ResultsListWithData = graphql(gqlQuery)(ResultsList);

export default ResultsListWithData;