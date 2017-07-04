import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import HomePageStateHolder from '../pages/HomePageStateHolder.jsx';

// App component - represents the whole app
export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <HomePageStateHolder />
        </div>
      </MuiThemeProvider>
    );
  }
}
