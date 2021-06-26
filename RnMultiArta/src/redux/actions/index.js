export const actionAllDog = () => {
  return {
    type: 'ACTION_ALL_DOG',
    payload: [],
  };
};

export const actionDetailList = name => {
  return {
    type: 'ACTION_DETAIL_LIST',
    payload: name,
  };
};

export const actionImageDogs = name => {
  return {
    type: 'ACTION_IMAGE_DOGS',
    payload: name,
  };
};

export const actionResetImage = () => {
  return {
    type: 'ACTION_RESET_IMAGE_DOGS',
    payload: [],
  };
};

export const actionSearchDog = name => {
  return {
    type: 'ACTION_SEARCH_DOG',
    payload: name,
  };
};

export const actionRecentSearch = item => {
    return {
      type: 'ACTION_RECENT_SEARCH',
      payload: item,
    };
  };
