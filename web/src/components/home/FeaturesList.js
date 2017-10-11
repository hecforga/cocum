import React, { Component } from 'react';
import Divider from 'material-ui/Divider';

import Feature from './Feature.js';

const influencer = require('../img/influencer.jpg');
const cocumit = require('../img/cocumit.png');
const fashion = require('../img/fashion.jpg');

class FeaturesList extends Component {
  render() {
    return (
      <div>
          <Feature
            image={influencer}
            title="Moda de influencer de forma sencilla y práctica"
            text={
              <div>
                <span>
                  Saber qué ropa llevan tus bloggers favoritas nunca fue tan fácil. Buscamos dentro de las mejores marcas de ropa, te encontramos la que más te gusta y te decimos dónde puedes conseguirla, tanto ella como otras visualmente similares.
                </span>
                <br />
                <br />
                <span>
                  ¡Adéntrate ya en el Shazam de la moda!
                </span>
              </div>
            }
          />
          {/*<Divider style={styles.divider} />*/}
          <Feature
            image={cocumit}
            imageLeft={true}
            title="Consigue la prenda o rebusca dentro de Cocum"
            text={
              <div>
                <span>
                  Compra la ropa que te gusta de manera segura y rápida.
                </span>
                <br />
                <br />
                <span>
                  Y si eres de las indecisas... ¡sigue buscando otras alternativas similares hasta encontrar tu preferida!
                </span>
              </div>
            }
          />
          {/*<Divider style={styles.divider} />*/}
          <Feature
            image={fashion}
            title="Descubre las últimas tendencias"
            text={
              <div>
                <span>
                  Sé la primera en enterarte de las nuevas colecciones de las marcas y tiendas más importantes: Zara, Mango, Asos, Forever 21, La Redoute… ¡y muchas más!
                </span>
                <br/>
                <br/>
                <span>
                  Ahorra tiempo y dinero comparando la moda más trendy y filtrando por precio y tienda
                </span>
              </div>
            }
          />
      </div>
    );
  }
}

const styles = {
  divider: {
    marginTop: 16,
    marginBottom: 16
  }
};

export default FeaturesList;