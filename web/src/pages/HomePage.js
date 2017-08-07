import React, { Component } from 'react';

import Landing from '../components/Landing.js';
import CategoriesHeaderStateHolder from '../components/CategoriesHeaderStateHolder.js';
import ResultsListStateHolder from '../components/ResultsListStateHolder.js';

class HomePage extends Component {
  render() {
    return (
      <div>
        <Landing />
        <CategoriesHeaderStateHolder />
        <ResultsListStateHolder />
      </div>
    );
  }
}

export default HomePage;