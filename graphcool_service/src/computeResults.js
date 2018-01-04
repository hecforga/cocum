import * as fetch from 'isomorphic-fetch';
var isEmpty = require('lodash.isempty');

const LIRESOLR_SERVER_URL = 'http://34.242.219.160/solr/';

const categoriesInfo = {
  vestidos: {
    boosts: { fit: 11, length: 13, neck: 4, print: 13, sleeve: 9 },
    maxScore: 50.0
  }
};

export default async event => {
  try {
    const { mode, gender, category, imageUrl, productId, tags, filters } = event.data;

    const visualResults = fetchVisualResults(mode, gender, category, imageUrl, productId, filters);

    const textResults = fetchTextResults(mode, gender, category, tags, filters);

    const mixedResults = mixResults(await visualResults, await textResults, category);

    return { data: { results: mixedResults } };
  } catch (e) {
    return { error: e.message };
  }
};

async function fetchVisualResults(mode, gender, category, imageUrl, productId, filters) {
  let endpoint = generateVisualBaseUrl(gender, category);
  switch (mode) {
    case 'url':
      endpoint = addUrl(endpoint, imageUrl);
      break;
    case 'id':
      endpoint = addId(endpoint, productId);
      break;
  }
  endpoint = addFilterQueries(endpoint, filters);
  return fetch(endpoint)
    .then(response => response.json()
      .then(json => json.docs || json.response || []
  ));
}

async function fetchTextResults(mode, gender, category, tags, filters) {
  if (mode === 'random' || !categoriesInfo[category] || isEmpty(tags)) {
    return [];
  }
  let endpoint = generateTextBaseUrl(gender, category);
  endpoint = addTextQuery(endpoint, category, tags);
  endpoint = addFilterQueries(endpoint, filters);
  const numFound = fetch(endpoint)
    .then(response => response.json()
      .then(json => json.response.numFound
  ));
  endpoint += '&rows=' + await numFound;
  return fetch(endpoint)
    .then(response => response.json()
      .then(json => json.response.docs
  ));
}

const mixResults = (visualResults, textResults, category) => {
  if (textResults.length) {
    const maxScore = categoriesInfo[category].maxScore;
    visualResults.forEach((visualResult) => {
      const foundTextResult = textResults.find((textResult) => textResult.id === visualResult.id);
      if (foundTextResult) {
        visualResult.d = visualResult.d * (1.0 - 0.5 * foundTextResult.score / maxScore);
      }
    });
    visualResults = visualResults.sort((a, b) => a.d - b.d);
  }
  return visualResults.map((r) => r.id).slice(0, 12);
};

const generateVisualBaseUrl = (gender, category) => {
  return LIRESOLR_SERVER_URL + gender + '_' + category + '/lireq?rows=90&field=ce&ms=false';
};

const generateTextBaseUrl = (gender, category) => {
  const threshold = (categoriesInfo[category].maxScore / 2) | 0; // double to int
  return LIRESOLR_SERVER_URL + gender + '_' + category + '/select?wt=json&fl=id%20score&sc={!func}query({!type=lucene%20v=$q})&fq={!frange%20l=' + threshold + '}$sc';
};

const addFilterQueries = (url, filters) => {
  let filterQueries = '';
  if (filters.minPrice || filters.maxPrice) {
    filterQueries += '&fq=price:[' + (filters.minPrice || '*') + '%20TO%20' + (filters.maxPrice || '*') + ']';
  }
  if (filters.shops && filters.shops.length) {
    filterQueries += '&fq=shop:(';
    filters.shops.forEach((shop) => filterQueries += shop + ' ');
    filterQueries += ')';
  }
  return url + filterQueries;
};

const addUrl = (url, imageUrl) => {
  const cloudinaryUrl = 'http://res.cloudinary.com/ddjzq70ve/image/fetch/x_0.1,y_0.1,w_0.8,h_0.8,c_crop,e_brightness_hsb:20/';

  return url + '&url=' + cloudinaryUrl + imageUrl;
};

const addId = (url, productId) => {
  return url + '&id=' + productId;
};

const addTextQuery = (url, category, tags) => {
  let query = '&q='
  const boosts = categoriesInfo[category].boosts;

  for (const tagName in tags) {
    query += tagName + ':' + tags[tagName] + '^=' + boosts[tagName] + ' ';
  }

  return url + query;
};
