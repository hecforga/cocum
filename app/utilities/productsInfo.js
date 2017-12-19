import * as fromShopsInfo from './shopsInfo.js';

const cloudinaryUrl = 'http://res.cloudinary.com/ddjzq70ve/image/fetch/w_300/';

export const getPriceLabel = (product) => product.price + ' €';

export const getShopAndBrandLabel = (product) =>
  fromShopsInfo.getShopLabel(product.shop) + (product.brand ? (': ' + product.brand) : '');

export const getShopOrBrandLabel = (product) =>
  product.brand ? product.brand : fromShopsInfo.getShopLabel(product.shop);

export const getModelImageUrl = (product) => {
  let imageUrl = product.modelImageUrl || product.productImageUrl;
  if (product.shop === 'laredoute') {
    imageUrl = cloudinaryUrl + imageUrl;
  }
  return imageUrl;
};

export const getProductImageUrl = (product) =>
  product.productImageUrl || product.modelImageUrl;

export const getProductUrl = (product) =>
  product.affiliateUrl || product.productUrl;

export const getShopDomain = (product) =>
  fromShopsInfo.getShopdomain(product.shop);
