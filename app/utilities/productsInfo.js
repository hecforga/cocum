export const getPriceLabel = (product) => product.price + ' €';

export const getShopAndBrandLabel = (product) =>
  product.shop.toUpperCase() + (product.brand ? (': ' + product.brand) : '');

export const getModelImageUrl = (product) =>
  product.modelImageUrl || product.productImageUrl;

export const getProductImageUrl = (product) =>
  product.productImageUrl || product.modelImageUrl;

export const getProductUrl = (product) =>
  product.affiliateUrl || product.productUrl;
