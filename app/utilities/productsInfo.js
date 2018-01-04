import * as fromShopsInfo from './shopsInfo.js';

const cloudinaryUrl = 'http://res.cloudinary.com/ddjzq70ve/image/fetch/w_300/';

export const getPriceLabel = (product) => product.price + ' €';

export const getShopAndBrandLabel = (product) =>
  fromShopsInfo.getShopLabel(product.shop) + (product.brand ? (': ' + product.brand) : '');

export const getShopOrBrandLabel = (product) =>
  product.brand ? product.brand : fromShopsInfo.getShopLabel(product.shop);

export const getDisplayImageUrl = (product) => {
  let imageUrl = product.displayImageUrl;
  if (product.shop === 'laredoute') {
    imageUrl = cloudinaryUrl + imageUrl;
  }
  return imageUrl;
};

export const getProductUrl = (product) =>
  product.affiliateUrl || product.productUrl;

export const getShopDomain = (product) =>
  fromShopsInfo.getShopDomain(product.shop);
