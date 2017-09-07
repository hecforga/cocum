import React from 'react';
import { connect } from 'react-redux';

import { getWholeState } from '../../reducers';
import * as actions from '../../actions';

import MyButton from '../common/MyButton.js';

let HeaderButtonContainer = ({ iconName, title, onPress, state }) => (
  <MyButton
    iconName={iconName}
    iconFamily={'FontAwesome'}
    touchableType={'opacity'}
    title={title}
    onPress={() => handleOnPress(state, onPress)}
    disabled={!state.canGoNext}
    buttonStyle={{ minWidth: 80 }}
    containerStyle={{ marginRight: 8 }}
  />
);

const handleOnPress = (state, onPress) => {
  onPress(state);
};

const mapStateToProps = (state) => ({
  state: state
});

HeaderButtonContainerWithState = connect(
  mapStateToProps,
  actions
)(HeaderButtonContainer);

export default HeaderButtonContainerWithState;