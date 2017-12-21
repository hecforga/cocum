import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { gql, graphql, compose } from 'react-apollo';

import { getCategorySelectionStatus, getCategorySelectionErrorMessage, getSelectedImage, getQuery } from '../../reducers';
import * as actions from '../../actions/index';

import ErrorView from '../common/ErrorView.js';
import SelectedImage from './SelectedImage.js';
import CategoriesList from './CategoriesList.js';

class CategorySelectionContainer extends Component {
  componentWillMount() {
    const { setCanGoNext } = this.props;

    setCanGoNext(false);
  }

  componentDidMount() {
    const { categorySelectionDidMount } = this.props;

    categorySelectionDidMount();
  }

  componentWillUpdate(nextProps) {
    if (this.props.status !== nextProps.status) {
      switch (nextProps.status) {
        case 'init':
        case 'retry':
          this.pickImage();
          break;
        case 'image_picker_cancelled':
          nextProps.navigation.goBack(null);
          break;
        case 'image_selected':
          this.createMyQuery();
          break;
        case 'ready_to_upload_full_image':
          this.uploadFullImage(nextProps.query);
          break;
        case 'full_image_uploaded':
          this.computePredictions(nextProps.query);
          break;
      }
    }
  }

  componentWillUnmount() {
    const { onCategorySelectionWillUnmount } = this.props;

    onCategorySelectionWillUnmount();
  }

  pickImage() {
    const { navigation, pickImage } = this.props;

    pickImage(navigation.state.params.imagePickerMode);
  }

  createMyQuery() {
    const { query, createMyQuery, createMyQueryMutate } = this.props;

    createMyQuery(createMyQueryMutate, query);
  }

  uploadFullImage(query) {
    const { selectedImage, uploadFullImage } = this.props;

    uploadFullImage(query.id, selectedImage.fullImageUri, query.category);
  }

  computePredictions(query) {
    const { computePredictions, computePredictionsMutate } = this.props;

    computePredictions(computePredictionsMutate, query);
  }

  render() {
    const {
      status,
      errorMessage,
      selectedImage,
      setSelectedImageLayout,
      setSelectedImageCropData,
      query,
      setCanGoNext,
      onCategorySelectionRetryPress
    } = this.props;

    if (status === 'error') {
      return (
        <View style={styles.centeredContainer}>
          <ErrorView
            message={errorMessage}
            onRetryPress={onCategorySelectionRetryPress}
          />
        </View>
      );
    }

    return selectedImage.fullImageUri ? (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <SelectedImage
            selectedImage={selectedImage}
            category={query.category}
            onSelectedImageLayoutComputed={setSelectedImageLayout}
            setSelectedImageCropData={setSelectedImageCropData}
          />
        </View>
        <View style={styles.bottomContainer}>
          <CategoriesList
            selectedCategory={query.category}
            setQueryCategory={(category) => this.setQueryCategory(category)}
            setCanGoNext={setCanGoNext}
          />
        </View>
      </View>
    ) : null;
  }

  setQueryCategory(category) {
    const { query, setQueryCategory } = this.props;

    setQueryCategory(category, query.id);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  topContainer: {
    flex: 2
  },
  bottomContainer: {
    flex: 1
  }
});

const mapStateToProps = (state) => ({
  status: getCategorySelectionStatus(state),
  errorMessage: getCategorySelectionErrorMessage(state),
  selectedImage: getSelectedImage(state),
  query: getQuery(state)
});

const createMyQuery = gql`
  mutation createMyQuery ($gender: String!) {
    createMyQuery(gender: $gender) {
      id
    }
  }
`;

const computePredictions = gql`
  mutation computePredictions ($gender: String!, $category: String!, $imageUrl: String!) {
    computePredictions(gender: $gender, category: $category, imageUrl: $imageUrl) {
      tags
    }
  }
`;

export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  graphql(createMyQuery, { name: 'createMyQueryMutate' }),
  graphql(computePredictions, { name: 'computePredictionsMutate' })
)(CategorySelectionContainer);