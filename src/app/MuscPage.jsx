import React from 'react';
import { connect } from 'react-redux';
import * as mp from './redux/musicPage';

const mapStateToProps = state => {
  return {
    songs: mp.getSongsByUser(state)
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchSongs: mp.fetchSongs(dispatch)
  };
};

class MusicPage extends React.Component {
  render () {
    return (
      
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MusicPage);
