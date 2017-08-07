import React from 'react';
import { connect } from 'react-redux';

import { getQuery } from '../reducers';
import { setQueryCategory } from '../actions';

import CategoriesHeader from './CategoriesHeader.js';

let CategoriesHeaderStateHolder = ({ query, setQueryCategory }) => (
  <CategoriesHeader category={query.category} setQueryCategory={setQueryCategory} />
);

const mapStateToProps = (state) => ({
  query: getQuery(state)
});

CategoriesHeaderStateHolder = connect(
  mapStateToProps,
  {
    setQueryCategory
  }
)(CategoriesHeaderStateHolder);

export default CategoriesHeaderStateHolder;