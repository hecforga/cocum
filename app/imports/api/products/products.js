import { Mongo } from 'meteor/mongo';

export const Products = new Mongo.Collection('products');

// Deny all client-side updates since we will be using methods to manage this collection
Products.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});