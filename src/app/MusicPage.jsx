import React from 'react';
import { connect } from 'react-redux';
import * as mp from './redux/musicPage';

const mapStateToProps = state => {
  let newState = {
    songs: mp.getSongsByUser(state),
    isFetching: state.isFetching
  };
  if (state.error) {
    newState.error = state.error;
  }
  return newState;
};
const mapDispatchToProps = dispatch => {
  return {
    fetchSongs: mp.fetchSongs(dispatch)
  };
};

class MusicPage extends React.PureComponent {
  render () {
    return (
      <div>
        <pre>
          {JSON.stringify(this.props.songs, null, 4)}
        </pre>
        <AuthorBox />
      </div>
    );
  }
}

class AuthorBox extends React.PureComponent {
  render () {
    return (
      'yee'
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MusicPage);
