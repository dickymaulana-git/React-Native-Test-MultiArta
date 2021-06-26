const initialState = {
  allDog: [],
  detail: [],
  image: [],
  search: [],
  limit: '10',
  recent: []
};

const DogReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ALL_DOG':
      return {
        ...state,
        allDog: action.payload,
      };
    case 'SET_DETAIL_DOG':
      return {
        ...state,
        detail: action.payload,
      };
    case 'SET_IMAGE_DOG':
      return {
        ...state,
        image: state.image.concat(action.payload),
      };
    case 'SET_RESET_IMAGE_DOG':
      return {
        ...state,
        image: action.payload,
      };
    case 'SET_SEARCH_DOG':
      return {
        ...state,
        search: action.payload,
      };
      case 'SET_RECENT_SEARCH':
      return {
        ...state,
        recent: [action.payload, ...state.recent]
      };
    default:
      return state;
  }
};

export default DogReducer;
