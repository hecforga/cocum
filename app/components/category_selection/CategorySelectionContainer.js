import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { ImagePicker } from 'expo';


import { getSelectedImage, getQuery } from '../../reducers/index';
import * as actions from '../../actions/index';

import SelectedImage from './SelectedImage.js'; 
import CategoriesList from './CategoriesList.js';

class CategorySelectionContainer extends Component {
  componentWillMount() {     
    const { selectImage, setCanGoNext, navigation } = this.props;

    setCanGoNext(false);

    if (navigation.state.params.imagePickerMode === 'gallery') {
      ImagePicker.launchImageLibraryAsync({allowsEditing: false}).then((pickedImage) => {
        this.handleImagePicked(pickedImage, navigation, selectImage);
      });
    } else {
      ImagePicker.launchCameraAsync({allowsEditing: false}).then((pickedImage) => {
        this.handleImagePicked(pickedImage, navigation, selectImage);
      });
    }
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

  handleImagePicked(pickedImage, navigation, selectImage) {
    if (pickedImage.cancelled) {
      navigation.goBack(null);
    } else {
      selectImage(pickedImage.uri, pickedImage.width, pickedImage.height);
    }
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