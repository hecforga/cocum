import { Mongo } from 'meteor/mongo';

export const Queries = new Mongo.Collection('queries');

// Deny all client-side updates since we will be using methods to manage this collection
Queries.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});