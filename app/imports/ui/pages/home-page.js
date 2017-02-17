import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Queries } from '../../api/queries/queries.js';
import { Products } from '../../api/products/products.js';

import './home-page.html';

import '../components/query-image-selection/query-image-selection.js';
import '../components/query-results-list/query-results-list.js';

Template.Home_page.onCreated(function() {
  this.currentQueryId = new ReactiveVar('');

  this.autorun(() => {
    this.subscribe('queries.all');

    const currentQuery = Queries.findOne(this.currentQueryId.get());
    this.subscribe('products.byIds', currentQuery ? currentQuery.results : []);
  });
});

Template.Home_page.helpers({
  getCurrentQuery() {
    const instance = Template.instance();
    return Queries.findOne(instance.currentQueryId.get());
  },

  getCurrentQueryId() {
    const instance = Template.instance();
    return instance.currentQueryId;
  },

  getCurrentProducts() {
    return Products.find();

  }
});