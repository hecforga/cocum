import React, { Component } from 'react';
import { StyleSheet, View, Text, ImageEditor } from 'react-native';
import { connect } from 'react-redux';

import { getSelectedImage, getQuery, getResultsIds, getResultsStatus, getResultsErrorMessage } from '../reducers';
import * as actions from '../actions';

import ResultsListWithData from './ResultsList.js';

class ResultsStateHolder extends Component {
  componentWillMount() {
    const { setCanGoNext } = this.props;
    setCanGoNext(true);
  }

  componentDidMount() {
    this.cropImage();
  }

  componentWillUpdate(nextProps) {
    switch (nextProps.status) {
      case 'image_cropped':
        this.uploadImage(nextProps.query.imageUri);
        break;
      case 'image_uploaded':
        this.fetchResults(nextProps.query);
        break;
    }
  }

  cropImage() {
    const { selectedImage, cropImage } = this.props;
    cropImage(ImageEditor.cropImage, selectedImage.imageUri, selectedImage.cropData);
  }

  uploadImage(imageUri) {
    const { uploadImage } = this.props;
    uploadImage(imageUri);
  }

  fetchResults(query) {
    const { fetchResults } = this.props;
    fetchResults(query.gender, query.category, query.imageUrl);
  }

  render() {
    const { status, ids, errorMessage } = this.props;

    if (status === 'error') {
      return (
        <View style={styles.container}>
          <Text>{errorMessage}</Text>
        </View>
      );
    }

    if (status !== 'results_ready') {
      return (
        <View style={styles.container}>
          <Text>Cargando...</Text>
        </View>
      );
    }

    return (
      <View style={ styles.container }>
        <ResultsListWithData ids={ids} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const mapStateToProps = (state) => ({
  selectedImage: getSelectedImage(state),
  query: getQuery(state),
  ids: getResultsIds(state),
  status: getResultsStatus(state),
  errorMessage: getResultsErrorMessage(state)
});

ResultsStateHolder = connect(
  mapStateToProps,
  actions
)(ResultsStateHolder);

export default ResultsStateHolder;
