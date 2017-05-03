import React, { Component } from 'react';

import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import ActionShoppingCartIcon from 'material-ui/svg-icons/action/shopping-cart';

export default class QueryResultsList extends Component {
  render() {
    return (
      <div className="col-xs-12 col-md-8 col-lg-9" style={{overflow: 'auto', height: '97vh'}}>
        <div className="box">
          <GridList cellHeight={'auto'} cols={3} padding={8}>
            {this.props.products.map((product) =>
              <GridTile
                key={product._id}
                title={product.shop.toUpperCase()}
                subtitle={<span><b>{product.price}€</b></span>}
                actionIcon={<IconButton href={product.productUrl} target="_blank"><ActionShoppingCartIcon color="white" /></IconButton>}
              >
                <a href={product.productUrl} target="_blank">
                  <img src={product.imageUrl} style={{width: '100%'}} />
                </a>
              </GridTile>
            )}
          </GridList>
        </div>
      </div>
    );
  }
}