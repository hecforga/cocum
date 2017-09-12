export const getPriceLabel = (product) => product.price + ' €';

export const getShopAndBrandLabel = (product) =>
  product.shop.toUpperCase() + (product.brand ? (': ' + product.brand) : '');

export const getModelImageUrl = (product) =>
  product.modelImageUrl || product.productImageUrl || product.imageUrl; // TODO: Remove || product.imageUrl when updating Grapchcool

export const getProductImageUrl = (product) =>
  product.productImageUrl || product.modelImageUrl || product.imageUrl; // TODO: Remove || product.imageUrl when updating Grapchcool

export const getProductUrl = (product) =>
  product.affiliateUrl || product.productUrl;