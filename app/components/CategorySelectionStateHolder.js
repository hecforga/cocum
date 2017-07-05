import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { ImagePicker } from 'expo';

import { getQuery} from '../reducers';
import { newQuery, setQueryCategory } from '../actions';

import SelectedImage from './SelectedImage.js'; 
import CategoriesList from './CategoriesList.js';

class CategorySelectionStateHolder extends Component {

  componentWillMount() { 
    const { onImageSelected } = this.props; 
    ImagePicker.launchImageLibraryAsync({allowsEditing: false}).then((pickedImage) => {
      if(!pickedImage.cancelled){
        onImageSelected(pickedImage.uri);
      }
    });
  }   

  render() {
    const { query, onCategoryChange } = this.props;

    return query.imageUri ? (
      <View style={ styles.container }>
        <View style={ styles.topContainer }>        
          <SelectedImage imageUrl={query.imageUri} />
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
  query: getQuery(state)  
});

CategorySelectionStateHolder = connect(
  mapStateToProps,
  {    
    onCategoryChange : setQueryCategory,
    onImageSelected : newQuery
  }
)(CategorySelectionStateHolder);

export default CategorySelectionStateHolder;