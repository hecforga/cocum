import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';

import App from '../imports/ui/layouts/App.jsx';

Meteor.startup(() => {
  // Needed for onTouchTap
  // http://stackoverflow.com/a/34015469/988941
  injectTapEventPlugin();

  render(<App />, document.getElementById('render-target'));
});
