import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = { artwork: null };

  async componentDidMount() {
    const response = await fetch('/getArtwork', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        year: 1800
      })
    });
    const responseObject = await response.json();
    if (response.status !== 200) {
      throw Error(responseObject.message);
    }
    console.log('response', responseObject);
    this.setState({ artwork: responseObject.artwork });
  }

  render() {
    console.log('state', this.state.artwork);
    return <div className="App">There's a story behind every work of art.</div>;
  }
}

export default App;
