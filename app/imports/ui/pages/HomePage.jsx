import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Products } from '../../api/products/products.js';

class HomePage extends Component {
  render() {
    return (
      <div>
        <h5 className="row center-align">
          Hay {this.props.products.length} productos
        </h5>
      </div>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('products.all');

  return {
    products: Products.find().fetch()
  };
}, HomePage);
