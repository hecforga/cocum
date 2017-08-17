import React from 'react';

const Landing = () => {
  const backgroundImage = require('./img/landing_background.png');
  const logo = require('./img/logo.png');
  const storesButtons = require('./img/stores_buttons.png');

  return (
    <div
      style={{
        height: '500px',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          height: '100px',
          width: '100%',
          paddingLeft: '50px',
          paddingRight: '50px',
          boxSizing: 'border-box'
        }}
      >
        <div style={{display: 'flex', alignItems: 'flex-end'}}>
          <img
            src={logo}
            style={{height: '100px'}}
          />
          <span style={{marginLeft: '16px', fontSize: 48, fontStyle: 'italic', fontFamily: 'Roboto', fontWeight: 500}}>
            Cocum
          </span>
        </div>
      </div>
      <div style={{display: 'flex', justifyContent: 'center', position: 'absolute', top: 100, height: '400px', width: '67%'}}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            position: 'absolute',
            top: 50,
            height: '50px',
            fontSize: 32,
            fontFamily: 'Roboto'
          }}
        >
          <p>Encontrar la ropa que te inspira...</p>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            position: 'absolute',
            top: 100,
            height: '50px',
            fontSize: 32,
            fontFamily: 'Roboto'
          }}
        >
          ¡Ahora más fácil que nunca!
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            position: 'absolute',
            top: 150,
            height: '150px',
            fontSize: 24,
            fontFamily: 'Roboto'
          }}
        >
          Próximamente en:
        </div>
        <img
          src={storesButtons}
          style={{
            position: 'absolute',
            top: 300,
            height: '50px'
          }}
        />
      </div>
    </div>
  );
};

export default Landing;
