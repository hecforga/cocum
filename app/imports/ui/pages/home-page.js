import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Queries } from '../../api/queries/queries.js';
import { Products } from '../../api/products/products.js';

import './home-page.html';

import '../components/query-image-selection/query-image-selection.js';
import '../components/query-results-list/query-results-list.js';

Template.Home_page.onCreated(function() {
  this.currentQueryId = new ReactiveVar('');
  this.currentQueryId.cleanResultsAndSet = (newId) => {
    const oldId = this.currentQueryId.get();
    Queries.update(oldId, { $set: { results: [] } });
    this.currentQueryId.set(newId);
  };

  this.getCurrentQuery = () => {
    return Queries.findOne(this.currentQueryId.get());
  };

  this.autorun(() => {
    const currentQuery = this.getCurrentQuery();
    this.subscribe('products.byCurrentQuery', currentQuery);
  });
});

Template.Home_page.helpers({
  getCurrentQuery() {
    const instance = Template.instance();
    return instance.getCurrentQuery();
  },

  getCurrentQueryId() {
    const instance = Template.instance();
    return instance.currentQueryId;
  },

  getQueries() {
    return Queries.find();
  },

  getCurrentProducts() {
    const instance = Template.instance();
    const currentQuery = instance.getCurrentQuery();
    const results = currentQuery ? currentQuery.results : [];
    const currentProducts = [];
    results.forEach(result =>  {
      currentProducts.push(Products.findOne({ id: result }));
    });
    return currentProducts;
  }
});