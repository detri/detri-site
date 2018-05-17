import React from 'react';
import SongBox from './SongBox.jsx';
import Title from './Title.jsx';
import ScrollBox from './ScrollBox.jsx';
import { connect } from 'react-redux';
import { tryNewSongs } from '../ducks/songs';

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
            return <SongBox key={song.id} song={song} />
          })}
        </ScrollBox>
      </React.Fragment>
    );
  }
}

export default connect(state => ({
  ...state.songs
}), {
  tryNewSongs
})(NewSongs);