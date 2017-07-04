import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import { getQueries, getSelectedQuery } from '../reducers';
import { setSelectedQuery } from '../actions';

import SelectedImage from './SelectedImage.js';
import ImagesList from './ImagesList.js';

class ImageSelectionStateHolder extends Component {
  componentWillMount() {
    const { onImageClick } = this.props;
    onImageClick('0');
  }

  render() {
    const { queries, selectedQuery, onImageClick } = this.props;

    return (
      <View style={ styles.container }>
        <View style={ styles.topContainer }>
          <SelectedImage imageUrl={selectedQuery.imageUrl} />
        </View>
        <View style={ styles.bottomContainer }>
          <ImagesList queries={queries} selectedQueryId={selectedQuery.id} onImageClick={onImageClick} />
        </View>
      </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topContainer: {
    flex: 2
  },
  bottomContainer: {
    flex: 1
  }
});

const mapStateToProps = (state) => ({
  queries: getQueries(state),
  selectedQuery: getSelectedQuery(state),
});

ImageSelectionStateHolder = connect(
  mapStateToProps,
  { onImageClick : setSelectedQuery }
)(ImageSelectionStateHolder);

export default ImageSelectionStateHolder;