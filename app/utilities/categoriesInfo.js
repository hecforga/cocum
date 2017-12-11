const categories = [
  {
    name: 'vestidos',
    labels: [
      'Vestidos'
    ],
    icon: require('../components/img/vestidos.png'),
    image: require('../components/img/vestidos_button.png')
  }, {
    name: 'monos',
    labels: [
      'Monos'
    ],
    icon: require('../components//img/monos.png'),
    image: require('../components/img/monos_button.png')
  }, {
    name: 'tops_bodies',
    labels: [
      'Tops y',
      'bodies'
    ],
    icon: require('../components//img/tops_bodies.png'),
    image: require('../components/img/tops_bodies_button.png')
  }, {
    name: 'camisetas',
    labels: [
      'Camisetas'
    ],
    icon: require('../components//img/camisetas.png'),
    image: require('../components/img/camisetas_button.png')
  }, {
    name: 'camisas_blusas',
    labels: [
      'Camisas y',
      'blusas'
    ],
    icon: require('../components//img/camisas_blusas.png'),
    image: require('../components/img/camisas_blusas_button.png')
  }, {
    name: 'faldas',
    labels: [
      'Faldas'
    ],
    icon: require('../components//img/faldas.png'),
    image: require('../components/img/faldas_button.png')
  }, {
    name: 'pantalones_cortos',
    labels: [
      'Pantalones',
      'cortos'
    ],
    icon: require('../components//img/pantalones_cortos.png'),
    image: require('../components/img/pantalones_cortos_button.png')
  }, {
    name: 'pantalones_largos',
    labels: [
      'Pantalones',
      'largos'
    ],
    icon: require('../components//img/pantalones_largos.png'),
    image: require('../components/img/pantalones_largos_button.png')
  }, {
    name: 'sudaderas_jerseis',
    labels: [
      'Sudaderas y',
      'jerseis'
    ],
    icon: require('../components//img/sudaderas_jerseis.png'),
    image: require('../components/img/sudaderas_jerseis_button.png')
  }, {
    name: 'abrigos_chaquetas',
    labels: [
      'Abrigos y',
      'chaquetas'
    ],
    icon: require('../components//img/abrigos_chaquetas.png'),
    image: require('../components/img/abrigos_chaquetas_button.png')
  }
];

export default categories;

export const getCategoryLabel = (categoryName) =>
  categories.
    find((category) => category.name === categoryName).labels.
    reduce((accumulator, currentValue) => accumulator + ' ' + currentValue);
