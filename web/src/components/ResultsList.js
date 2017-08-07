import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import GridList , { GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Search from 'material-ui/svg-icons/action/search';

class ResultsList extends Component {
  render() {
    const { results, data, setQueryProductId } = this.props;

    if (!results) {
      return null;
    }

    const products = data.allProducts;
    return (
      <GridList
        cellHeight={'auto'}
        cols={4}
        padding={8}
        style={{margin: 0}}
      >
        {results.map((result, index) => {
          const product = products.find((p) => p.productId === result);
          return (
            <GridTile
              key={index}
              title={product.shop.toUpperCase()}
              subtitle={<span><b>{product.price}€</b></span>}
              actionIcon={
                <IconButton
                  tooltip="Buscar similares"
                  tooltipPosition="top-left"
                  onTouchTap={() => setQueryProductId(product.productId)}
                >
                  <Search color="white" />
                </IconButton>
              }
            >
              <a href={product.productUrl} target="_blank">
                <img
                  src={product.imageUrl}
                  style={{width: '100%'}} />
              </a>
            </GridTile>
          );
        }
        )}
      </GridList>
    );
  }
}

const gqlQuery = gql`query getProductsByIds($results: [String!]) {
  allProducts(filter: {
    productId_in: $results
  }) {
    productId,
    imageUrl,
    productUrl,
    price,
    shop
  }
}`;

const ResultsListWithData = graphql(gqlQuery)(ResultsList);

export default ResultsListWithData;