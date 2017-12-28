import { createSelector } from 'reselect';
import * as _ from 'lodash';

// ACTIONS
const FETCH_SONGS_START = 'FETCH_SONGS_START';
const FETCH_SONGS_ERR = 'FETCH_SONGS_ERR';
const FETCH_SONGS_SUCCESS = 'FETCH_SONGS_SUCCESS';

// DEFAULT STATE
const defaultState = {
  isFetching: false,
  songs: {}
};

// ACTION CREATORS
export const fetchSongs = dispatch => {
  dispatch({ type: FETCH_SONGS_START });
  fetch('/api/songs')
    .then(response => {
      return response.json();
    })
    .then(json => {
      dispatch({ type: FETCH_SONGS_SUCCESS, songs: json.body });
    })
    .catch(err => {
      dispatch({ type: FETCH_SONGS_ERR, error: err });
    });
};

// REDUCER
export default function reducer (state = defaultState, action) {
  switch (action.type) {
    case FETCH_SONGS_START:
      return Object.assign({}, state, {
        isFetching: true
      });
    case FETCH_SONGS_ERR:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });
    case FETCH_SONGS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        songs: action.songs
      });
    default:
      return state;
  }
}

export const getSongs = state => state.songs;

export const getSongsByUser = createSelector(
  getSongs,
  songs => _.groupBy(songs, 'author')
);
