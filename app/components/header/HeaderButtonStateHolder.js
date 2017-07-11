import React from 'react';
import { connect } from 'react-redux';

import { getCanGoNext } from '../../reducers';
import * as actions from '../../actions';

import HeaderButton from './HeaderButton.js';

let HeaderButtonStateHolder = ({ iconName, iconSize, onPress, canGoNext }) => (
  <HeaderButton
    iconName={iconName}
    iconSize={iconSize}
    onPress={onPress}
    canGoNext={canGoNext}
  />
);

const mapStateToProps = (state) => ({
  canGoNext: getCanGoNext(state)
});

HeaderButtonStateHolder = connect(
  mapStateToProps,
  actions
)(HeaderButtonStateHolder);

export default HeaderButtonStateHolder;