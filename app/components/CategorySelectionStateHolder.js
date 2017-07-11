import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { ImagePicker } from 'expo';

import { getSelectedImage, getQuery } from '../reducers';
import * as actions from '../actions';

import SelectedImage from './SelectedImage.js'; 
import CategoriesList from './CategoriesList.js';

class CategorySelectionStateHolder extends Component {

  componentWillMount() {     
    const { selectImage, resetSelectedImage, navigation } = this.props; 
    resetSelectedImage();
    ImagePicker.launchImageLibraryAsync({allowsEditing: false}).then((pickedImage) => {
      if(!pickedImage.cancelled){
        selectImage(pickedImage.uri, pickedImage.width, pickedImage.height);
      } else {
        navigation.goBack(null);
      }
    });
  }   

  render() {
    const {
      selectedImage,
      setSelectedImageLayout,
      setSelectedImageCropData,
      query,
      setQueryCategory,
    } = this.props;

    return selectedImage.imageUri ? (
      <View style={ styles.container }>
        <View style={ styles.topContainer }>
          <SelectedImage
            selectedImage={selectedImage}
            onSelectedImageLayoutComputed={setSelectedImageLayout}
            setSelectedImageCropData={setSelectedImageCropData}
          />
        </View>
        <View style={ styles.bottomContainer }>
          <CategoriesList selectedCategory={query.category} onCategoryChange={setQueryCategory} />
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
  selectedImage: getSelectedImage(state),
  query: getQuery(state)  
});

CategorySelectionStateHolder = connect(
  mapStateToProps,
  actions
)(CategorySelectionStateHolder);

export default CategorySelectionStateHolder;