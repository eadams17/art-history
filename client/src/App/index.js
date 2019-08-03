import React, { Component } from 'react';
import styles from './style.module.css';
import Artwork from '../Artwork';
import Scale from '../Scale';

class App extends Component {
  state = { artworkInfo: null, newsInfo: null, loading: true };

  async componentDidMount() {
    this.getContent(1919);
  }

  async getContent(year) {
    this.setState({ loading: true });
    const response = await fetch('/getContent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ year: year })
    });
    const responseObject = await response.json();
    if (response.status !== 200) {
      throw Error(responseObject.message);
    }
    this.setState({
      artworkInfo: responseObject.artwork,
      newsInfo: responseObject.news,
      loading: false
    });
  }

  updateYear = year => {
    this.getContent(year);
  };

  render() {
    const { artworkInfo, loading } = this.state;
    console.log(this.state);
    return (
      <div className={styles.container}>
        There's a story behind every work of art.
        <Scale updateYear={this.updateYear} />
        {loading && (
          <i id={styles.spinner} className="fas fa-palette fa-spin fa-6x" />
        )}
        {artworkInfo && !loading && (
          <Artwork artworkInfo={this.state.artworkInfo} />
        )}
      </div>
    );
  }
}

export default App;
