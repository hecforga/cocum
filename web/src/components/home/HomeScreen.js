import React, { Component } from 'react';

import Landing from './Landing.js';
import HowItWorks from './HowItWorks.js';
import FeaturesList from './FeaturesList.js';

class HomeScreen extends Component {
  render() {
    return (
      <div className="my-container">
        <Landing />
        <HowItWorks />
        <FeaturesList />
      </div>
    );
  }
}

export default HomeScreen;
