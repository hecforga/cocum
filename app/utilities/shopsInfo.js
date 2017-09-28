const shops = [
  {
    name: 'asos',
    label: 'ASOS'
  }, {
    name: 'forever21',
    label: 'Forever 21'
  }, {
    name: 'guess',
    label: 'GUESS'
  }, {
    name: 'laredoute',
    label: 'La Redoute'
  }, {
    name: 'mango',
    label: 'MANGO'
  }, {
    name: 'missguided',
    label: 'Missguided'
  }, {
    name: 'superdry',
    label: 'Superdry'
  }, {
    name: 'zara',
    label: 'ZARA'
  }
];

export default shops;

export const getShopLabel = (shopName) =>
  shops.find((shop) => shop.name === shopName).label;