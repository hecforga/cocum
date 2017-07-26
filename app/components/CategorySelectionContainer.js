import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { ImagePicker } from 'expo';

import { getSelectedImage, getQuery } from '../reducers';
import * as actions from '../actions';

import SelectedImage from './SelectedImage.js'; 
import CategoriesList from './CategoriesList.js';

class CategorySelectionContainer extends Component {
  componentWillMount() {     
    const { selectImage, setCanGoNext, navigation } = this.props;

    setCanGoNext(false);

    ImagePicker.launchImageLibraryAsync({allowsEditing: false}).then((pickedImage) => {
      if(!pickedImage.cancelled){
        selectImage(pickedImage.uri, pickedImage.width, pickedImage.height);
      } else {
        navigation.goBack(null);
      }
    });
  }

  componentWillUnmount() {
    const { resetSelectedImage, resetQuery } = this.props;

    resetSelectedImage();
    resetQuery();
  }

  render() {
    const {
      selectedImage,
      setSelectedImageLayout,
      setSelectedImageCropData,
      query,
      setQueryCategory,
      setCanGoNext
    } = this.props;

    return selectedImage.imageUri ? (
      <View style={ styles.container }>
        <View style={ styles.topContainer }>
          <SelectedImage
            selectedImage={selectedImage}
            category={query.category}
            onSelectedImageLayoutComputed={setSelectedImageLayout}
            setSelectedImageCropData={setSelectedImageCropData}
          />
        </View>
        <View style={ styles.bottomContainer }>
          <CategoriesList selectedCategory={query.category} setQueryCategory={setQueryCategory} setCanGoNext={setCanGoNext} />
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

CategorySelectionContainerWithState = connect(
  mapStateToProps,
  actions
)(CategorySelectionContainer);

export default CategorySelectionContainerWithState;