import React, { Component } from 'react';

const lanzadera = require('../img/lanzadera.png');

class Footer extends Component {
  render() {
    return (
      <div className="row center-xs" style={{ backgroundColor: '#424242', padding: 16 }}>
        <div className="col-xs-10">
          <div className="row middle-xs">
            <div className="col-xs-12 col-md-3" style={{ marginBottom: 16 }}>
              <div className="box center-xs start-md">
                <a href="http://lanzadera.es/" target="_blank">
                  <img
                    src={lanzadera}
                    style={{ width: '80%' }}
                  />
                </a>
              </div>
            </div>

            <div className="col-xs-12 col-md-9">
              <div className="row top-xs start-xs">
                <div className="col-xs-4">
                  <div className="box">
                    <div style={styles.title}>Cocum</div>
                    <div style={styles.textContainer}>
                      <a
                        href="http://blog.cocum.es"
                        style={styles.text}
                      >
                        Blog
                      </a>
                    </div>
                    <div style={styles.textContainer}>
                      <a
                        href="https://s3.eu-central-1.amazonaws.com/cocumweb/Aviso+legal.pdf"
                        target="_blank"
                        style={styles.text}
                      >
                        Aviso legal
                      </a>
                    </div>
                  </div>
                </div>

                <div className="col-xs-4">
                  <div className="box">
                    <div style={styles.title}>Descargar</div>
                    <div style={styles.textContainer}>
                      <a
                        href="https://play.google.com/store/apps/details?id=com.cocum.app"
                        target="_blank"
                        style={styles.text}
                      >
                        Android
                      </a>
                    </div>
                    <div style={styles.textContainer}>
                      <a
                        href="https://itunes.apple.com/es/app/cocum-de-la-foto-a-tu-armario/id1288563446"
                        target="_blank"
                        style={styles.text}
                      >
                        iPhone
                      </a>
                    </div>
                  </div>
                </div>

                <div className="col-xs-4">
                  <div className="box">
                    <div style={styles.title}>Síguenos</div>
                    <div style={styles.textContainer}>
                      <a
                        href="https://www.instagram.com/cocum_app/"
                        target="_blank"
                        style={styles.text}
                      >
                        Instagram
                      </a>
                    </div>
                    <div style={styles.textContainer}>
                      <a
                        href="https://www.facebook.com/cocumtheapp/"
                        target="_blank"
                        style={styles.text}
                      >
                        Facebook
                      </a>
                    </div>
                    <div style={styles.textContainer}>
                      <a
                        href="https://www.linkedin.com/company/25069683/"
                        target="_blank"
                        style={styles.text}
                      >
                        Linkedin
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  title: {
    textTransform: 'uppercase',
    color: 'white',
    fontWeight: 500,
    fontSize: 16,
    marginBottom: 8
  },
  textContainer: {
    marginBottom: 2
  },
  text: {
    color: 'white',
    textDecoration: 'none'
  }
};

export default Footer;
