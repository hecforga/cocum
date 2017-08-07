import React, { Component } from 'react';

import Landing from '../components/Landing.js';
import CategoriesHeaderStateHolder from '../components/CategoriesHeaderStateHolder.js';
import ResultsListStateHolder from '../components/ResultsListStateHolder.js';
import QueEsCocum from '../components/QueEsCocum.js';

class HomePage extends Component {
  render() {
    return (
      <div>
        <Landing />
        <CategoriesHeaderStateHolder />
        <ResultsListStateHolder />
        <QueEsCocum />
      </div>
    );
  }
}

export default HomePage;