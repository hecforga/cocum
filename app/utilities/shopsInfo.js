const shops = [
  {
    name: 'asos',
    label: 'ASOS',
    domain: 'asos.com'
  }, {
    name: 'forever21',
    label: 'Forever 21',
    domain: 'forever21.com'
  }, {
    name: 'guess',
    label: 'GUESS',
    domain: 'guess.eu'
  }, {
    name: 'laredoute',
    label: 'La Redoute',
    domain: 'laredoute.es'
  }, {
    name: 'mango',
    label: 'MANGO',
    domain: 'mango.com'
  }, {
    name: 'missguided',
    label: 'Missguided',
    domain: 'missguided.com'
  }, {
    name: 'pullandbear',
    label: 'PULLANDBEAR',
    domain: 'pullandbear.com'
  }, {
    name: 'superdry',
    label: 'Superdry',
    domain: 'superdry.es'
  }, {
    name: 'zara',
    label: 'ZARA',
    domain: 'zara.com'
  }
];

export default shops;

const getShopWithName = (shopName) =>
  shops.find((shop) => shop.name === shopName);

export const getShopLabel = (shopName) =>
  getShopWithName(shopName).label;

export const getShopDomain = (shopName) =>
  getShopWithName(shopName).domain;
