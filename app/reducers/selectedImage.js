const initialState = {
  fullImageUri: '',
  originalWidth: 0,
  originalHeight: 0,
  layout: null,
  cropData: null,
  croppedImageUri: ''
};

const selectedImage = (state = initialState, action) => {
  switch (action.type) {
    case 'SELECT_IMAGE':
      return {
        ...state,
        fullImageUri: action.imageUri,
        originalWidth: action.width,
        originalHeight: action.height
      };
    case 'SET_SELECTED_IMAGE_LAYOUT':
      return {
        ...state,
        layout: action.layout
      };
    case 'SET_SELECTED_IMAGE_CROP_DATA':
      return {
        ...state,
        cropData: action.cropData
      };
    case 'CROP_IMAGE_SUCCESS':
      return {
        ...state,
        croppedImageUri: action.imageUri
      };
    case 'ON_CATEGORY_SELECTION_WILL_UNMOUNT':
      return initialState;
    default:
      return state;
  }
};

export default selectedImage;

export const getSelectedImage = (state) =>
  state;