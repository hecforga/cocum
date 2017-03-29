import { Queries } from '../../../queries/queries.js';

let modulee;

const handler = (data, promise) => {
  try {
    modulee = promise;
    console.log(data);
    // TODO: Call liresolr with the url of the cropped image as parameter, get the results and update the queries collection with them
  } catch (exception) {
    modulee.reject(`[querySucceeded.handler] ${exception}`);
  }
};

export const croppingSucceeded = (data) => handler(data);