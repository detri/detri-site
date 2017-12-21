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
    for (let author of {songs}) {
      for (let song of author) {

      }
    }
    return (
      <div class='row'>
      
      </div>
    );
  }
}

class AuthorBox extends React.Component {
  render () {
    <div class="col-md-4">
      
    </div>  
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MusicPage);
