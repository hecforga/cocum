import { Meteor } from 'meteor/meteor';

import { Products } from '../products.js';

Meteor.publish('products.byIds', function(productsIds) {
  return Products.find({ id: { $in: productsIds } });
});
