import { Meteor } from 'meteor/meteor';
import { croppingSucceeded } from './cropping-succeeded.js';

const scenarios = {
  'cropping.succeeded': croppingSucceeded,
};

const handler = ({ body }) => {
  try {
    const { type, data } = body;
    const scenario = scenarios[type];
    if (scenario) scenario(data.object);
  } catch (exception) {
    throw new Meteor.Error('500', `[liresolrHandler.handler] ${exception}`);
  }
};

export const lambdaHandler = (options) => handler(options);