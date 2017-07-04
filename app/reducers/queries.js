import { combineReducers } from 'redux';

const data = [
  {
    id: '0',
    imageUrl : "https://res.cloudinary.com/ddjzq70ve/image/upload/v1493830905/5710189427_2_6_2.jpg",
    gender: 'mujer',
    category: 'abrigos_chaquetas'
  }, {
    id: '1',
    imageUrl : "https://res.cloudinary.com/ddjzq70ve/image/upload/v1493831103/2878042600_6_1_1.jpg",
    gender: 'mujer',
    category: 'vestidos_monos'
  }, {
    id: '2',
    imageUrl : "https://res.cloudinary.com/ddjzq70ve/image/upload/v1493831271/0605022401_6_1_1.jpg",
    gender: 'mujer',
    category: 'camisas_blusas'
  }
];

const all = (state = data, action) =>
  state;

const selected = (state = '0', action) => {
  switch (action.type) {
    case 'SET_SELECTED_QUERY':
      return action.id;
    default:
      return state;
  }
};

const queries = combineReducers({
  all,
  selected
});

export default queries;

export const getQueries = (state) =>
  state.all;

export const getSelectedQuery = (state) =>
  state.all.find((query) => query.id === state.selected);