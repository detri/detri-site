const PLAY = 'detri-site/musicPlayer/PLAY';
const PAUSE = 'detri-site/musicPlayer/PAUSE';
const CHANGE_SONG = 'detri-site/musicPlayer/CHANGE_SONG';

const defaultState = {
  playing: false,
  curSong: {
    id: '',
    url: ''
  }
};

export function play() {
  return {
    type: PLAY
  };
}

export function pause() {
  return {
    type: PAUSE
  };
}

export function changeSong(song) {
  return {
    type: CHANGE_SONG,
    song: {
      id: song.id,
      url: song.url
    }
  };
}

export default function reducer(state = defaultState, action = {}) {
  switch(action.type) {
    case PLAY:
      return {
        ...state,
        playing: true
      };
    case PAUSE:
      return {
        ...state,
        playing: false
      };
    case CHANGE_SONG:
      return {
        ...state,
        curSong: action.song
      };
    default:
      return state;
  }
}