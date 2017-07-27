import React from 'react';
import { connect } from 'react-redux';

import { getCanGoNext } from '../../reducers';
import * as actions from '../../actions';

import HeaderButton from './HeaderButton.js';

let HeaderButtonContainer = ({ iconName, title, onPress, canGoNext }) => (
  <HeaderButton
    iconName={iconName}
    title={title}
    onPress={onPress}
    canGoNext={canGoNext}
  />
);

const mapStateToProps = (state) => ({
  canGoNext: getCanGoNext(state)
});

HeaderButtonContainerWithState = connect(
  mapStateToProps,
  actions
)(HeaderButtonContainer);

export default HeaderButtonContainerWithState;