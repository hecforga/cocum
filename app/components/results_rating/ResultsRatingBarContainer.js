import React, { Component } from 'react';
import { StyleSheet, View, Text, ImageEditor, Button } from 'react-native';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';

import { getRatingBarState, getQuery } from '../../reducers';
import * as actions from '../../actions';

import ResultsRatingBar from './ResultsRatingBar.js';

class ResultsRatingBarContainer extends Component {

  render(){

    const { ratingBarState, setGivenRating } = this.props;

    return(
      <View>
        {ratingBarState.isVisible ?
          <View style={ styles.resultsRatingBar }>
            <ResultsRatingBar
              disabled={false }
              givenRating={ratingBarState.givenRating}
              onPress={setGivenRating}
            />
            <Button
              title="Aceptar" 
              onPress={()=> this.setQueryRating()}
            />
          </View>
          :
          <View/>
        }
      </View>     
    );    
  }

  componentWillUnmount() {
    const { resetRatingBarState } = this.props;
    resetRatingBarState();
  }

  setQueryRating() {
    const { setQueryRating, setRatingBarVisibility, mutate } = this.props;
    setRatingBarVisibility(false);
    setQueryRating(mutate);

  }
}

const styles = StyleSheet.create({
  resultsRatingBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const UpdateMyQueryResultsRating = gql`
  mutation UpdateMyQueryResultsRating($id: ID!, $imageUrl: String!, $rating: Int!, $resultsList: [String!]) {
    updateMyQuery(id: $id, imageUrl: $imageUrl, rating: $rating, resultsList: $resultsList ) {
      id
    }
  }
`;



const ResultsRatingBarContainerWithData = graphql(UpdateMyQueryResultsRating, {
  options: ({query, ratingBarState}) => ({
    variables: {
      id : query.id, 
      imageUrl : query.imageUrl, //para la beta
      rating : ratingBarState.givenRating,
      resultsList : query.resultsList //para la beta
    }
  })
})(ResultsRatingBarContainer);

const mapStateToProps = (state) => ({
  ratingBarState: getRatingBarState(state),
  query: getQuery(state),
});

ResultsRatingBarContainerWithDataAndState = connect(
  mapStateToProps,
  actions
)(ResultsRatingBarContainerWithData);

export default ResultsRatingBarContainerWithDataAndState;