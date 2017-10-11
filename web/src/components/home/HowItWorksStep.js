import React, { Component } from 'react';
import Divider from 'material-ui/Divider';

class DescriptionStep extends Component {
  render() {
    const { image, text } = this.props;

    return (
      <div className="box center-xs">
        <img
          src={image}
          style={{ width: '60%', marginBottom: 24 }}
        />
        <div style={{ color: 'white' }}>{text}</div>
        <Divider style={{ marginTop: 8, marginBottom: 16 }}/>
      </div>
    );
  }
}

export default DescriptionStep;