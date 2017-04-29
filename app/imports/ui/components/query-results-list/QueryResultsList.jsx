import React, { Component } from 'react';

export default class QueryResultsList extends Component {
  getProductsInArraysOf3() {
    const products = this.props.products;
    const productsInArraysOf3 = [];
    let auxArray = [];
    let count = 0;
    products.forEach(product => {
      if (count > 0 && count % 3 === 0) {
        productsInArraysOf3.push(auxArray);
        auxArray = [];
      }
      auxArray.push(product);
      count++;
    });
    if (auxArray.length) {
      productsInArraysOf3.push(auxArray);
    }
    return productsInArraysOf3;
  }

  render() {
    const productsInArraysOf3 = this.getProductsInArraysOf3();
    const productsList = productsInArraysOf3.map((productsArray) => {
      const auxList = productsArray.map((product) =>
        <div key={product._id} className="col s12 m4">
          <a href={product.productUrl} target="_blank">
            <img className="responsive-img" src={product.imageUrl} />
          </a>
        </div>
      );
      return (
        <div key={productsArray[0]._id} className="row">
          {auxList}
        </div>
      )
    });

    return (
      <div className="col s12 m8 l9" style={{overflowY: 'auto', height: '100vh'}}>
        {productsList}
      </div>
    );
  }
}