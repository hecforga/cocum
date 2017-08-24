const LIRESOLR_SERVER_URL = 'http://54.93.254.52:8983/solr/';

export const fetchResults = (gender, category, imageUrl) => {
  const cloudinaryUrl = 'http://res.cloudinary.com/ddjzq70ve/image/fetch/e_brightness_hsb:20/';
  const url = LIRESOLR_SERVER_URL + gender + '_' + category + '/lireq?url=' + cloudinaryUrl + imageUrl + '&field=ce&ms=false&rows=12';

  return fetch(url).then((response) => {
    const docs = JSON.parse(response._bodyText).docs;
    let results = [];
    docs.forEach((doc) => results.push(doc.id));
    return results;
  });
};