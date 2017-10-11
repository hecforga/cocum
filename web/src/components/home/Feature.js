import React, { Component } from 'react';

class Feature extends Component {
  render() {
    const { image, imageLeft, title, text } = this.props;

    return (
      <div className="row center-xs" style={{ backgroundColor: imageLeft ? '#eeeeee' : 'white', padding: 16 }}>
        <div className="col-xs-10">
          <div className={'row' + (imageLeft ? ' reverse' : '') + ' middle-xs'}>
            <div className="col-xs-12 col-md-6" style={{ marginBottom: 16 }}>
              <div className="box center-xs start-md">
                <h2>{title}</h2>
                <div>{text}</div>
              </div>
            </div>
            <div className="col-xs-12 col-md-6">
              <div className="box center-xs">
                <img
                  src={image}
                  style={{ width: '80%' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Feature;