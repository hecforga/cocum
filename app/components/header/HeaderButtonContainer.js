import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import MyButton from '../common/MyButton.js';

class HeaderButtonContainer extends Component {
  render() {
    const { iconName, title, onPress, state } = this.props;

    return (
      <MyButton
        iconName={iconName}
        iconFamily={'FontAwesome'}
        touchableType={'opacity'}
        title={title}
        onPress={() => this.handleOnPress(state, onPress)}
        disabled={!state.canGoNext}
        buttonStyle={{ minWidth: 80 }}
        containerStyle={{ marginRight: 8 }}
      />
    );
  }

  handleOnPress(state, onPress) {
    onPress(state);
  }
}

const mapStateToProps = (state) => ({
  state: state
});

export default connect(
  mapStateToProps,
  actions
)(HeaderButtonContainer);