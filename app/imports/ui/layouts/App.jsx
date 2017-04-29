import React, { Component } from 'react';

import HomePageStateHolder from '../pages/HomePageStateHolder.jsx';

// App component - represents the whole app
export default class App extends Component {
  render() {
    return (
      <div style={{overflowY: 'hidden',}}>
        <HomePageStateHolder />
      </div>
    );
  }
}
