import * as fetch from 'isomorphic-fetch';

const LIRESOLR_SERVER_URL = 'http://34.242.219.160/solr/';

const categoriesInfo = {
  prueba: {
    properties: ['fit', 'length', 'neck', 'print', 'sleeve']
  }
};

export default async event => {
  try {
    const { gender, category, productId } = event.data;

    const tags = fetchProductTags(gender, category, productId);

    return { data: { tags: await tags } };
  } catch (e) {
    return { error: e.message };
  }
};

async function fetchProductTags(gender, category, productId) {
  if (!categoriesInfo[category]) {
    return {};
  }
  let endpoint = generateBaseUrl(gender, category);
  endpoint = addQuery(endpoint, productId);
  endpoint = addFields(endpoint, category);
  return fetch(endpoint)
    .then(response => response.json()
      .then(json => json.response.docs[0]
  ));
}

const generateBaseUrl = (gender, category) => {
  return LIRESOLR_SERVER_URL + gender + '_' + category + '/select?wt=json';
};

const addQuery = (url, productId) => {
  return url + '&q=id:' + productId;
};

const addFields = (url, properties) => {
  let fields = '&fl=';

  const properties = categoriesInfo[category].properties;
  properties.map((property) => {
    fields += property + ' ';
  });

  return url + fields;
};
