import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import { getSelectedQuery, getQuery } from '../reducers';
import { newQuery, setQueryCategory } from '../actions';

import SelectedImage from './SelectedImage.js';
import CategoriesList from './CategoriesList.js';

class CategorySelectionStateHolder extends Component {
  componentWillMount() {
    const { cleanQuery, onComponentWillMount } = this.props;
    onComponentWillMount(cleanQuery);
  }

  render() {
    const { query, onCategoryChange } = this.props;

    return query ? (
      <View style={ styles.container }>
        <View style={ styles.topContainer }>
          <SelectedImage imageUrl={query.imageUrl} />
        </View>
        <View style={ styles.bottomContainer }>
          <CategoriesList selectedCategory={query.category} onCategoryChange={onCategoryChange} />
        </View>
      </View>
    ) : null;
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
  cleanQuery: getSelectedQuery(state),
  query: getQuery(state)
});

CategorySelectionStateHolder = connect(
  mapStateToProps,
  {
    onComponentWillMount: newQuery,
    onCategoryChange : setQueryCategory
  }
)(CategorySelectionStateHolder);

export default CategorySelectionStateHolder;