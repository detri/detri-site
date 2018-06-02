const PLAY = 'detri-site/musicPlayer/PLAY';
const PAUSE = 'detri-site/musicPlayer/PAUSE';
const CHANGE_SONG = 'detri-site/musicPlayer/CHANGE_SONG';
const UPDATE_PROGRESS = 'detri-site/musicPlayer/UPDATE_PROGRESS';

const defaultState = {
  playing: false,
  curSong: null,
  progressPct: 0
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
    song: song
  };
}

export function updateProgress(pct) {
  return {
    type: UPDATE_PROGRESS,
    progressPct: pct
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
    case UPDATE_PROGRESS:
      return {
        ...state,
        progressPct: action.progressPct
      };
    default:
      return state;
  }
}