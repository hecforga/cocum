const LIRESOLR_SERVER_URL = 'http://139.59.155.103:8983/solr/';

export const fetchResults = (gender, category, imageUrl) => {
  const url = LIRESOLR_SERVER_URL + gender + '_' + category + '/lireq?url=' + imageUrl + '&field=ce&ms=false&rows=12';

  return fetch(url).then((response) => {
    const docs = JSON.parse(response._bodyText).docs;
    let results = [];
    docs.forEach((doc) => results.push(doc.id));
    return results;
  });
};