const LIRESOLR_SERVER_URL = 'http://139.59.155.103:8983/solr/';

export const fetchResults = (gender, category, productId) => {
  console.log(productId);
  let url = LIRESOLR_SERVER_URL + gender + '_' + category + '/lireq?';

  if (productId) {
    url += 'id=' + productId + '&field=ce&ms=false&rows=12';
  } else {
    url += 'rows=12';
  }

  return fetch(url).then((response) => response.json().then((json) => {
    const docs = json.docs || json.response;
    let results = [];
    docs.forEach((doc) => results.push(doc.id));
    return results;
  }));
};