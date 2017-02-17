import './routes.js';

Meteor._reload.onMigrate(function() {
  return [false];
});