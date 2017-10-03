import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import MyButton from '../common/MyButton.js';

class HeaderButtonContainer extends Component {
  render() {
    const {
      iconName,
      iconFamily,
      iconColor,
      title,
      buttonStyle,
      containerStyle,
      onPress,
      isDisabled,
      noBackground,
      state
    } = this.props;

    return (
      <MyButton
        iconName={iconName}
        iconFamily={iconFamily}
        iconColor={iconColor}
        title={title}
        onPress={() => this.handleOnPress(state, onPress)}
        disabled={this.handleIsDisabled(state, isDisabled)}
        noBackground={noBackground}
        buttonStyle={buttonStyle}
        containerStyle={containerStyle}
      />
    );
  }

  handleOnPress(state, onPress) {
    onPress(state);
  }

  handleIsDisabled(state, isDisabled) {
    return isDisabled(state);
  }
}

const mapStateToProps = (state) => ({
  state: state
});

export default connect(
  mapStateToProps,
  actions
)(HeaderButtonContainer);