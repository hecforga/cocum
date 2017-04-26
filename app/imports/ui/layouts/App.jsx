import React, { Component } from 'react';

import HomePage from '../pages/HomePage.jsx';
import Header from '../components/header/Header.jsx';

// App component - represents the whole app
export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <HomePage />
      </div>
    );
  }
}
