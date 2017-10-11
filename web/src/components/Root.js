import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from 'material-ui/styles';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import HomeScreen from './home/HomeScreen.js';
import BlogScreen from './blog/BlogScreen.js';

class Root extends Component {
  constructor(props) {
    super(props);

    injectTapEventPlugin();
  }

  render() {
    const { store } = this.props;

    return (
      <Provider store={store}>
        <MuiThemeProvider>
          <Router>
            <div>
              <Route exact path="/" component={HomeScreen} />
              <Route path="/blog" component={BlogScreen} />
            </div>
          </Router>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default Root;
