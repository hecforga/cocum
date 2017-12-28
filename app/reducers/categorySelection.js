import { combineReducers } from 'redux';

const status = (state = '', action) => {
  switch (action.type) {
    case 'ON_CATEGORY_SELECTION_DID_MOUNT':
      return 'init';
    case 'IMAGE_PICKER_CANCELLED':
      return 'image_picker_cancelled';
    case 'SELECT_IMAGE':
      return 'image_selected';
    case 'CREATE_MY_QUERY_SUCCESS':
      return action.category ? 'ready_to_upload_full_image' : 'my_query_created';
    case 'SET_QUERY_CATEGORY':
      return  action.id ? 'ready_to_upload_full_image' : 'category_selected';
    case 'UPLOAD_FULL_IMAGE_SUCCESS':
      return 'full_image_uploaded';
    case 'CATEGORY_SELECTION_FAILURE':
      return 'error';
    case 'ON_CATEGORY_SELECTION_RETRY_PRESS':
      return 'retry';
    default:
      return state;
  }
};

const errorMessage = (state = null, action) =>{
  switch (action.type) {
    case 'ON_CATEGORY_SELECTION_DID_MOUNT':
      return null;
    case 'CATEGORY_SELECTION_FAILURE':
      return action.message;
    default:
      return state;
  }
};

const categorySelection = combineReducers({
  status,
  errorMessage
});

export default categorySelection;

export const getStatus = (state) => state.status;
export const getErrorMessage = (state) => state.errorMessage;