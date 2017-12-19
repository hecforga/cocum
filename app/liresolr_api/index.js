const LIRESOLR_SERVER_URL = 'http://54.93.254.52/solr/';

const addUrlQuery = (url, params) => {
  const cloudinaryUrl = 'http://res.cloudinary.com/ddjzq70ve/image/fetch/x_0.1,y_0.1,w_0.8,h_0.8,c_crop,e_brightness_hsb:20/';

  return url + '&url=' + cloudinaryUrl + params.query.imageUrl;
};

const addIdQuery = (url, params) => {
  return url + '&id=' + params.productId;
};

const generateBaseUrl = (params) => {
  const { gender, category } = params;
  return LIRESOLR_SERVER_URL + gender + '_' + category + '/lireq?rows=12&field=ce&ms=false'
};

const generateFilterQueries = (params) => {
  const filters = params.filters;
  let filterQueries = '';
  if (filters.minPrice || filters.maxPrice) {
    filterQueries += '&fq=price:[' + (filters.minPrice || '*') + '%20TO%20' + (filters.maxPrice || '*') + ']';
  }
  if (filters.shops) {
    filterQueries += '&fq=shop:(';
    filters.shops.forEach((shop) => filterQueries += shop + ' ');
    filterQueries += ')';
  }
  return filterQueries;
};

export const fetchResults = (mode, params) => {
  const baseUrl = generateBaseUrl(params);
  const filterQueries = generateFilterQueries(params);
  let url = baseUrl + filterQueries;

  switch (mode) {
    case 'url':
      url = addUrlQuery(url, params);
      break;
    case 'id':
      url = addIdQuery(url, params);
      break;
  }

  return fetch(url).then((response) => response.json().then((json) => {
    const docs = json.docs || json.response;
    let results = [];
    if (docs) {
      docs.forEach((doc) => results.push(doc.id));
    }
    return results;
  }));
};