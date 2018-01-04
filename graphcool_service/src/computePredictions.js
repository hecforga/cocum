import * as fetch from 'isomorphic-fetch';

const LAMBDA_URL = 'https://v3jn6b6jn3.execute-api.eu-west-1.amazonaws.com/dev/prediction';

const categoriesInfo = {
  vestidos: {
    properties: ['fit', 'length', 'neck', 'print', 'sleeve']
  }
};

export default async event => {
  try {
    const { gender, category, imageUrl } = event.data;

    const tags = fetchPredictions(gender, category, imageUrl);

    return { data: { tags: await tags } };
  } catch (e) {
    return { error: e.message };
  }
};

async function fetchPredictions(gender, category, imageUrl) {
  let tags = {};
  if (categoriesInfo[category]) {
    const properties = categoriesInfo[category].properties;
    await Promise.all(properties.map(async (property) => {
      tags[property] = await fetchPrediction(category, property, imageUrl);
    }));
  }
  return tags;
}

async function fetchPrediction(category, property, imageUrl) {
  const body = {
    data: {
      category,
      property,
      imageUrl
    }
  };
  return fetch(LAMBDA_URL, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      "Content-Type": 'application/json'
    }
  })
    .then(response => response.json()
      .then(json => (json['data'] && json['data']['prediction']) || 'undefined')
  );
}
