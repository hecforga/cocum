import React, { Component } from 'react';
import List, { makeSelectable } from 'material-ui/List';

let SelectableList = makeSelectable(List);

const wrapState = (ComposedComponent) => {
  return class SelectableList extends Component {
    constructor(props) {
      super(props);

      this.state = { selectedIndex: props.defaultValue };
    }

    render() {
      return (
        <ComposedComponent
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
        >
          {this.props.children}
        </ComposedComponent>
      );
    }

    handleRequestChange = (event, index) => {
      this.setState({
        selectedIndex: index,
      });
    }
  };
};

SelectableList = wrapState(SelectableList);

export default SelectableList;