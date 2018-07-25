import React from 'react';
import SongBox from '../Styling/SongBox.jsx';
import ScrollBox from '../Styling/ScrollBox.jsx';
import Title from '../Styling/Title.jsx';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { tryUser } from '../../ducks/userPage';
import { changeSong, play, pause } from '../../ducks/musicPlayer';

class UserPage extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!this.props.user) {
      this.props.tryUser(this.props.match.params.username);
    }
    console.log(this.props);
  }

  render() {
    if (this.props.error) {
      return <p>{error.toString()}</p>
    } else {
      return (
        <React.Fragment>
          {!this.props.user ?
          <Title>Loading user {this.props.match.params.username}...</Title>
          :
          <React.Fragment>
          <Title>{this.props.user.username}'s songs</Title>
            <ScrollBox width={"45%"} height={"calc(100% - 3.32em)"} margin={"2.5%"}>
              {this.props.user.Songs ? this.props.user.Songs.map(song => {
                song.User = this.props.user;
                return <a key={song.id} onClick={() => {
                  if (!this.props.curSong) {
                    this.props.changeSong(song);
                    this.props.play();
                  } else if (song.id !== this.props.curSong.id) {
                    if (this.props.playing) {
                      this.props.pause();
                    }
                    this.props.changeSong(song);
                    this.props.play();
                  } else if (song.id === this.props.curSong.id) {
                    if (this.props.playing) {
                      this.props.pause();
                    } else {
                      this.props.play();
                    }
                  }
                }}><SongBox key={song.id} song={song} playing={this.props.curSong && this.props.playing && this.props.curSong.id === song.id} /></a>
              }) : <p>No songs from this user.</p>}
            </ScrollBox>
          </React.Fragment>
          }
        </React.Fragment>
      )
    }
  }
}

export default withRouter(
  connect(state => ({
    ...state.userPage,
    playing: state.musicPlayer.playing,
    curSong: state.musicPlayer.curSong
  }), {
    tryUser,
    changeSong,
    play,
    pause
  })(UserPage));