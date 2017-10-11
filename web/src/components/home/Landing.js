import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

const logo = require('../img/logo.png');
const landing_front = require('../img/captura3.png');
const app_store = require('../img/app_store.png');
const google_play = require('../img/google_play.png');

class Landing extends Component {
  render() {
    return (
      <div
        className="row center-xs"
        style={{
          backgroundColor: '#00bcd4'
        }}
      >
        <div className="col-xs-10">
          {/*Header*/}
          <div className="row">
            <div className="col-xs-12 col-md-4">
              <div className="row center-xs start-md bottom-xs" style={{ height: '100%' }}>
                <div className="col-xs">
                  <div className="box" style={{ padding: 8 }}>
                    <Link to="/">
                      <img
                        src={logo}
                        style={{ height: '84px' }}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xs-6 col-md-4">
              <div className="row start-xs center-md middle-xs" style={{ height: '100%' }}>
                <div className="col-xs">
                  <div className="box">
                    {/*<Link to="/blog">
                      <FlatButton label="Blog" style={{ color: 'white', backgroundColor: 'transparent' }} />
                    </Link>*/}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xs-6 col-md-4">
              <div className="row end-xs middle-xs" style={{ height: '100%' }}>
                <div className="col-xs">
                  <div className="box">
                    <IconButton
                      href="https://www.instagram.com/cocum_app/"
                      target="_blank"
                    >
                      <FontIcon className="fa fa-instagram"  color="white" />
                    </IconButton>
                    <IconButton
                      href="https://www.facebook.com/cocumapp/"
                      target="_blank"
                    >
                      <FontIcon className="fa fa-facebook"  color="white" />
                    </IconButton>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">

            {/*Left*/}
            <div className="col-xs-12 col-md-6">
              {/*Text*/}
              <div className="row center-xs start-md">
                <div className="col-xs">
                  <div className="row middle-xs bottom-md" style={{ height: '200px' }}>
                    <div className="col-xs">
                      <div className="box">
                        <div
                          style={{
                            fontSize: 48,
                            color: 'white',
                            fontFamily: 'Josefin Sans, sans-serif'
                          }}
                        >
                          <span style={{ fontStyle: 'italic' }}>Cocum</span>, de la foto a tu armario.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row middle-xs" style={{ height: '150px' }}>
                    <div className="col-xs">
                      <div className="box">
                        <div style={{ fontSize: 24, color: 'white' }}>Encontrar la ropa que te inspira, ¡ahora más fácil que nunca!</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/*Store buttons*/}
              <div className="row middle-xs" style={{ height: '150px' }}>
                <div className="col-xs">
                  <div className="row">
                    <div className="col-xs-6">
                      <div className="box end-xs">
                        <img
                          src={app_store}
                          style={{ width: '100%', maxWidth: '216px' }}
                        />
                      </div>
                    </div>
                    <div className="col-xs-6">
                      <div className="box start-xs">
                        <a href="https://play.google.com/store/apps/details?id=com.cocum.app" target="_blank">
                          <img
                            src={google_play}
                            style={{ width: '100%', maxWidth: '216px' }}
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/*Right*/}
            <div className="col-xs-12 col-md-6" style={{ height: '500px' }}>
              <div className="box center-xs">
                <img
                  src={landing_front}
                  style={{ height: '500px' }}
                />
              </div>
            </div>
          </div>


        </div>
      </div>
    );
  }
}

const styles = {
  landingText: {
    color: 'white'
  }
};

export default Landing;
