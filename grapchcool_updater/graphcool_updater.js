const fs = require('fs');
const {Lokka} = require('lokka');
const {Transport} = require('lokka-transport-http');

const datasetFolder = "../dataset";

let genders = ["hombre", "mujer"];
if (process.argv[2] !== 'all') {
  genders = [process.argv[2]];
}

let categories = ["abrigos_chaquetas", "camisas_blusas", "camisetas", "faldas", "monos", "pantalones_cortos", "pantalones_largos", "sudaderas_jerseis", "tops_bodies", "vestidos"];
if (process.argv[3] !== 'all') {
    categories = [process.argv[3]]
}

let shops = ["asos", "forever21", "guess", "laredoute", "mango",  "missguided", "superdry", "zara"];
if (process.argv[4] !== 'all') {
    shops = [process.argv[4]];
}

const client = new Lokka({
  transport: new Transport('https://api.graph.cool/simple/v1/cj2grdzj0e72c0123e02e884g')
});

const newProducts = {};

const updateProduct = (productsFolder, category, shop, index) => {
  const productId = newProducts[category][shop][index];
  const productInfoPath = productsFolder + '/' + productId + '/' + productId + '.json';
  const productInfo = JSON.parse(fs.readFileSync(productInfoPath, 'utf8'));

  client.query(`
    query {
      allProducts(filter: {
        productId: "${productInfo.productId}"
        category: "${productInfo.category}"
      }) {
        id
    }
  }
  `).then((res) => {
    client.mutate(`
      {
        updateProduct(
          id: "${res.allProducts[0].id}",
          affiliateUrl: "${productInfo.affiliateUrl}",
          brand: "${productInfo.brand}",
          category: "${productInfo.category}",
          color: "${productInfo.color}",
          discounted: ${productInfo.discounted},
          gender: "${productInfo.gender}",
          modelImageUrl: "${productInfo.modelImageUrl}",
          price: "${productInfo.price}",
          productId: "${productInfo.productId}",
          productImageUrl: "${productInfo.productImageUrl}",
          productUrl: "${productInfo.productUrl}",
          shop: "${productInfo.shop}",
          title: "${productInfo.title}",
        ) {
          id
        }
      }
    `)
    .then(() => {
      if (index % 100 === 0) {
        console.log(category + ', ' + shop + ': analyzed ' + (index + 1) + ' of ' + newProducts[category][shop].length);
      }
    })
    .catch((error) => {
      throw error;
    });
  })
  .catch((error) => {
    console.log(error);
    console.log(productInfo.productId);
  })
  .finally(() => {
    if (index < newProducts[category][shop].length - 1) {
      updateProduct(productsFolder, category, shop, index + 1);
    }
  });
}

genders.forEach((gender) => {
  categories.forEach((category) => {
    newProducts[category] = {};
    const categoryFolder = datasetFolder + '/' + gender + '/' + category;
    shops.forEach((shop) => {
      const productsFolder = categoryFolder + '/' + shop + '/products';
      const newProductsFilePath = productsFolder + '/new_products.json';
      newProducts[category][shop] = JSON.parse(fs.readFileSync(newProductsFilePath, 'utf8'));
      if (newProducts[category][shop].length) {
        updateProduct(productsFolder, category, shop, 0);
      }
    });
  });
});
