const fs = require('fs');
const {Lokka} = require('lokka');
const {Transport} = require('lokka-transport-http');

const datasetFolder = "../dataset";

let genders = ["hombre", "mujer"];
if (process.argv[2] !== 'all') {
  genders = [process.argv[2]];
}

let categories = ["abrigos_chaquetas", "camisas_blusas", "camisetas_tops_bodies", "faldas", "pantalones_cortos", "pantalones_largos", "punto", "sudaderas_jerseis", "vestidos_monos"];
if (process.argv[3] !== 'all') {
    categories = [process.argv[3]]
}

let shops = ["pullandbear", "zara"];
if (process.argv[4] !== 'all') {
    shops = [process.argv[4]];
}

const client = new Lokka({
  transport: new Transport('https://api.graph.cool/simple/v1/cj2grdzj0e72c0123e02e884g')
});

genders.forEach((gender) => {
  categories.forEach((category) => {
    const categoryFolder = datasetFolder + '/' + gender + '/' + category;
    shops.forEach((shop) => {
      const productsFolder = categoryFolder + '/' + shop + '/products';
      const currentProductsFilePath = productsFolder + '/current_products.json';
      const currentProducts = JSON.parse(fs.readFileSync(currentProductsFilePath, 'utf8'));
      currentProducts.forEach((productId) => {
        const productInfoPath = productsFolder + '/' + productId + '/' + productId + '.json';
        const productInfo = JSON.parse(fs.readFileSync(productInfoPath, 'utf8'));

        client.mutate(`
          {
            createProduct(
              productId: "${productInfo.id}",
              imageUrl: "${productInfo.imageUrl}",
              productUrl: "${productInfo.productUrl}",
              shop: "${productInfo.shop}",
              price: "${productInfo.price}"
            ) {
              productId
            }
          }
        `);
      });
    });
  });
});
