import React from 'react';
import { render } from 'react-dom';

import configureStore from './configureStore.js';
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import Root from './components/Root.js';

const store = configureStore();
render(
  <Root store={store} />,
  document.getElementById('root')
);
registerServiceWorker();
