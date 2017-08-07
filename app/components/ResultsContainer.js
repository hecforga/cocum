import React, { Component } from 'react';
import { StyleSheet, View, Text, ImageEditor } from 'react-native';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';

import { getSelectedImage, getQuery, getResultsIds, getResultsStatus, getResultsErrorMessage } from '../reducers';
import * as actions from '../actions';

import ResultsListWithData from './ResultsList.js';

import ResultsRatingBarContainerWithDataAndState from './results_rating/ResultsRatingBarContainer.js';//para la beta

class ResultsContainer extends Component {
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
        this.generateQueryId();
        break;
      case 'id_generated':
        this.uploadImage(nextProps.query);
        break;
      case 'image_uploaded':
        this.fetchResults(nextProps.query);
        break;
    }
  }

  componentWillUnmount() {
    const { resetResults } = this.props;

    resetResults();
  }

  cropImage() {
    const { selectedImage, cropImage } = this.props;
    cropImage(ImageEditor.cropImage, selectedImage.imageUri, selectedImage.cropData);
  }

  generateQueryId() {
    const { generateQueryId, mutate } = this.props;
    generateQueryId(mutate);
  }

  uploadImage(query) {
    const { uploadImage } = this.props;
    uploadImage(query.id, query.imageUri, query.category);
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
        <ResultsRatingBarContainerWithDataAndState /> 
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

const CreateMyQueryMutation = gql`
  mutation CreateMyQueryMutation ($gender: String!, $category: String!) {
    createMyQuery(gender: $gender, category: $category ) {
      id
    }
  }
`;

const ResultsContainerWithData = graphql(CreateMyQueryMutation, {
  options: ({query}) => ({variables: {gender: query.gender, category: query.category}})
})(ResultsContainer);

const mapStateToProps = (state) => ({
  selectedImage: getSelectedImage(state),
  query: getQuery(state),
  ids: getResultsIds(state),
  status: getResultsStatus(state),
  errorMessage: getResultsErrorMessage(state)
});

ResultsContainerWithDataAndState = connect(
  mapStateToProps,
  actions
)(ResultsContainerWithData);

export default ResultsContainerWithDataAndState;