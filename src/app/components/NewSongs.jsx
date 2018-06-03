import React from 'react';
import SongBox from './SongBox.jsx';
import Title from './Title.jsx';
import ScrollBox from './ScrollBox.jsx';
import { connect } from 'react-redux';
import { tryNewSongs } from '../ducks/songs';
import { changeSong, pause, play } from '../ducks/musicPlayer';

class NewSongs extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (!this.props.newSongs.length) {
      this.props.tryNewSongs();
    }
  }

  render() {
    return (
      <React.Fragment>
        <Title>new songs</Title>
        <ScrollBox width={"45%"} height={"calc(100% - 3.32em)"} margin={"2.5%"}>
          {!this.props.newSongs ?
            <p>Loading newest 10 songs...</p>
            : this.props.newSongs.map(song => {
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
              }}><SongBox key={song.id} song={song} playing={this.props.curSong && this.props.playing && this.props.curSong.id === song.id} /></a>;
            })}
        </ScrollBox>
      </React.Fragment>
    );
  }
}

export default connect(state => ({
  ...state.songs,
  playing: state.musicPlayer.playing,
  curSong: state.musicPlayer.curSong
}), {
    tryNewSongs,
    changeSong,
    pause,
    play
  })(NewSongs);