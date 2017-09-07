const LIRESOLR_SERVER_URL = 'http://54.93.254.52:8983/solr/';

export const fetchResultsWithUrl = (params) => {
  const cloudinaryUrl = 'http://res.cloudinary.com/ddjzq70ve/image/fetch/e_brightness_hsb:20/';

  let baseUrl = generateBaseUrl(params);
  let filterQueries = generateFilterQueries(params);

  const url = baseUrl + '&url=' + cloudinaryUrl + params.query.imageUrl + '&field=ce&ms=false' + filterQueries;

  return fetchResults(url);
};

export const fetchResultsWithId = (params) => {
  let baseUrl = generateBaseUrl(params);
  let filterQueries = generateFilterQueries(params);

  const url = baseUrl + '&id=' + params.product.productId + '&field=ce&ms=false' + filterQueries;

  return fetchResults(url);
};

const generateBaseUrl = (params) => {
  const query = params.query;
  return LIRESOLR_SERVER_URL + query.gender + '_' + query.category + '/lireq?rows=12'
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

const fetchResults = (url) => {
  return fetch(url).then((response) => {
    const docs = JSON.parse(response._bodyText).docs;
    let results = [];
    docs.forEach((doc) => results.push(doc.id));
    return results;
  });
};