const categories = [
  {
    name: 'vestidos',
    labels: [
      'Vestidos'
    ],
    icon: require('../components/img/vestidos.png')
  }, {
    name: 'monos',
    labels: [
      'Monos'
    ],
    icon: require('../components//img/monos.png')
  }, {
    name: 'tops_bodies',
    labels: [
      'Tops y',
      'bodies'
    ],
    icon: require('../components//img/tops_bodies.png')
  }, {
    name: 'camisetas',
    labels: [
      'Camisetas'
    ],
    icon: require('../components//img/camisetas.png')
  }, {
    name: 'camisas_blusas',
    labels: [
      'Camisas y',
      'blusas'
    ],
    icon: require('../components//img/camisas_blusas.png')
  }, {
    name: 'faldas',
    labels: [
      'Faldas'
    ],
    icon: require('../components//img/faldas.png')
  }, {
    name: 'pantalones_cortos',
    labels: [
      'Pantalones',
      'cortos'
    ],
    icon: require('../components//img/pantalones_cortos.png')
  }, {
    name: 'pantalones_largos',
    labels: [
      'Pantalones',
      'largos'
    ],
    icon: require('../components//img/pantalones_largos.png')
  }, {
    name: 'sudaderas_jerseis',
    labels: [
      'Sudaderas y',
      'jerseis'
    ],
    icon: require('../components//img/sudaderas_jerseis.png')
  }, {
    name: 'abrigos_chaquetas',
    labels: [
      'Abrigos y',
      'chaquetas'
    ],
    icon: require('../components//img/abrigos_chaquetas.png')
  }
];

export default categories;

export const getCategoryLabel = (categoryName) =>
  categories.
    find((category) => category.name === categoryName).labels.
    reduce((accumulator, currentValue) => accumulator + ' ' + currentValue);
