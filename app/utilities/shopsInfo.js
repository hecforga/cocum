const shops = [
  {
    name: 'asos',
    label: 'ASOS'
  }, {
    name: 'laredoute',
    label: 'La Redoute'
  }, {
    name: 'mango',
    label: 'MANGO'
  }, {
    name: 'pullandbear',
    label: 'PULL&BEAR'
  }, {
    name: 'zara',
    label: 'ZARA'
  }
];

export default shops;

export const getShopLabel = (shopName) =>
  shops.find((shop) => shop.name === shopName).label;