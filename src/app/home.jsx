import React from 'react';

class Home extends React.Component {
  state = {
    songpath: "default"
  };
  componentWillMount () {
    fetch("/api/songs/latest").then(result => {
      result.json().then(res => {
        console.log(res);
        this.setState({
          songpath: "/music/" + res.body.filename
        });
      });
    });
  }
  render () {
    return (
      <center>
        <h1>Welcome to the ded.zone home page!</h1>
        <h3>Here is our most recently uploaded song:</h3>
        <audio controls src={this.state.songpath}></audio>
      </center>
    );
  }
}

export default Home;
