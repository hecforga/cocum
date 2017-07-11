const initialState = {
  imageUri: '',
  originalWidth: 0,
  originalHeight: 0,
  layout: null,
  cropData: {
    offset: {
      x: 0,
      y: 0
    },
    size: {
      width: 80,
      height: 80
    }
  }
};

const selectedImage = (state = initialState, action) => {
  switch (action.type) {
    case 'SELECT_IMAGE':
      return {
        ...state,
        imageUri: action.imageUri,
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
    case 'RESET_SELECTED_IMAGE':
      return initialState;
    default:
      return state;
  }
};

export default selectedImage;

export const getSelectedImage = (state) =>
  state;