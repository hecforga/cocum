import './query-results-list.html';

Template.Query_results_list.helpers({
  getProductsInArraysOf3() {
    const instance = Template.instance();
    const productsInArraysOf3 = [];
    let auxArray = [];
    let count = 0;
    instance.data.products.forEach(product => {
      if (count % 3 == 0) {
        productsInArraysOf3.push(auxArray);
        auxArray = [];
      }
      auxArray.push(product);
      count++;
    });
    productsInArraysOf3.push(auxArray);
    return productsInArraysOf3;
  }
});