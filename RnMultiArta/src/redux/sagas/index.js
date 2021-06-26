import {call, put, takeLatest} from 'redux-saga/effects';

const getAllDog = () => {
  return fetch('https://dog.ceo/api/breeds/list')
    .then(response => response.json())
    .then(json => {
      return json.message;
    })
    .catch(error => {
      console.error(error);
    });
};

const getDetailDog = name => {
  return fetch('https://dog.ceo/api/breed/' + name + '/list')
    .then(response => response.json())
    .then(json => {
      return json.message;
    })
    .catch(error => {
      console.error(error);
    });
};

const getImageDog = name => {
  console.log('get', name);

  return fetch(
    'https://dog.ceo/api/breed/' + name[0] + '/images/random/' + name[1],
  )
    .then(response => response.json())
    .then(json => {
      if (name.length === 2) {
        return json.message;
      } else {
        return json.message.filter(e =>
          e.includes(name[2].toLowerCase().replace(/\ /g, '-')),
        );
      }
    })
    .catch(error => {
      console.error(error);
    });
};

const getSearchDog = name => {
  return fetch('https://dog.ceo/api/breeds/list')
    .then(response => response.json())
    .then(json => {
      return json.message.filter(e => e.includes(name.toLowerCase()));
    })
    .catch(error => {
      console.error(error);
    });
};

/* Yield */

function* fetchName(action) {
  yield put({
    type: 'SET_NAME',
    payload: action.payload,
  });
}

function* fetchAllDog(action) {
  const allDogList = yield call(getAllDog, action.payload);
  yield put({
    type: 'SET_ALL_DOG',
    payload: allDogList,
  });
}

function* fetchDetailDog(action) {
  const detailDog = yield call(getDetailDog, action.payload);
  yield put({
    type: 'SET_DETAIL_DOG',
    payload: ['All ', ...detailDog],
  });
}

function* fetchImageDog(action) {
  const imageDog = yield call(getImageDog, action.payload);
  yield put({
    type: 'SET_IMAGE_DOG',
    payload: imageDog,
  });
}

function* fetchResetImageDog() {
  yield put({
    type: 'SET_RESET_IMAGE_DOG',
    payload: [],
  });
}

function* fetchRecentSearch(action) {
  yield put({
    type: 'SET_RECENT_SEARCH',
    payload: action.payload,
  });
}

function* fetchSearchDog(action) {
  const searchDog = yield call(getSearchDog, action.payload);
  yield put({
    type: 'SET_SEARCH_DOG',
    payload: searchDog,
  });
}

function* rootSaga() {
  yield takeLatest('ACTION_NAME', fetchName);
  yield takeLatest('ACTION_ALL_DOG', fetchAllDog);
  yield takeLatest('ACTION_DETAIL_LIST', fetchDetailDog);
  yield takeLatest('ACTION_IMAGE_DOGS', fetchImageDog);
  yield takeLatest('ACTION_RESET_IMAGE_DOGS', fetchResetImageDog);
  yield takeLatest('ACTION_SEARCH_DOG', fetchSearchDog);
  yield takeLatest('ACTION_RECENT_SEARCH', fetchRecentSearch);
}

export default rootSaga;
