import { Meteor } from 'meteor/meteor';

import { Queries } from '../queries.js';

Meteor.publish('queries.all', function() {
  return Queries.find();
});
