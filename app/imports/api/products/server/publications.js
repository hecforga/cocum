import { Meteor } from 'meteor/meteor';

import { Products } from '../products.js';

Meteor.publish('products.byCurrentQuery', function(currentQuery) {
  return Products.find({ id: { $in: currentQuery ? currentQuery.results : [] } });
});
