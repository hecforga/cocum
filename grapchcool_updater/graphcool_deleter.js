const fs = require('fs');
const {Lokka} = require('lokka');
const {Transport} = require('lokka-transport-http');

const datasetFolder = "../dataset";

let genders = ["hombre", "mujer"];
if (process.argv[2] !== 'all') {
  genders = [process.argv[2]];
}

let categories = ["abrigos_chaquetas", "camisas_blusas", "camisetas", "faldas", "monos", "pantalones_cortos", "pantalones_largos", "punto", "sudaderas_jerseis", "tops_bodies", "vestidos"];
if (process.argv[3] !== 'all') {
    categories = [process.argv[3]]
}

let shops = ["asos", "forever21", "guess", "laredoute", "mango", "missguided", "superdry", "zara"];
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
      const previousProductsFilePath = productsFolder + '/previous_products.json';
      const previousProducts = JSON.parse(fs.readFileSync(previousProductsFilePath, 'utf8'));
      previousProducts.forEach((productId) => {
        client.query(`
          query {
      	    allProducts(filter: {
              productId: "${productId}"
              category: "${category}"
            }) {
              id
      		}
    	  }
        `).then((res) => {
          client.mutate(`
            {
              deleteProduct(
                id: "${res.allProducts[0].id}"
              ) {
                id
              }
            }
          `)
          .catch((error) => {
            throw error;
          });
        })
        .catch((error) => {
          console.log(error);
          console.log(productId);
        });
      });
    });
  });
});
