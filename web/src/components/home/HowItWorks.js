import React, { Component } from 'react';

import HowItWorksStep from './HowItWorksStep.js';

const howItWorks1 = require('../img/how_it_works1.png');
const howItWorks2 = require('../img/how_it_works2.png');
const howItWorks3 = require('../img/how_it_works3.png');

class Description extends Component {
  render() {
    return (
      <div className="row center-xs" style={{ backgroundColor: '#424242', padding: 16 }}>
        <div className="col-xs-10">
          <div className="row">
            <div className="col-xs">
              <div className="box">
                <h2 style={{ color: 'white' }}>
                  Somos una App que permite encontrar la ropa que busque el usuario, mostrando siempre las alternativas más parecidas</h2>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12 col-md-4">
              <HowItWorksStep image={howItWorks1} text="Haz una foto o elige de tu galería" />
            </div>
            <div className="col-xs-12 col-md-4">
              <HowItWorksStep image={howItWorks2} text="Selecciona una categoría y ajusta la prenda" />
            </div>
            <div className="col-xs-12 col-md-4">
              <HowItWorksStep image={howItWorks3} text="¡Encuentra alternativas a la ropa que te inspira!" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Description;
