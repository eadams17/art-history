import React, { Component } from 'react';
import styles from './style.module.css';
import Artwork from '../Artwork';
import Scale from '../Scale';
import Marquee from '../Marquee';

export class App extends Component {
  state = { artworkInfo: null, newsInfo: null, loading: true };

  async componentDidMount() {
    this.getContent(1900);
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
      newsInfo: responseObject.news
    });
  }

  updateYear = year => {
    this.getContent(year);
  };

  imageLoaded = () => {
    this.setState({ loading: false });
  };

  render() {
    console.log('state', this.state);
    const { artworkInfo, newsInfo, loading } = this.state;
    return (
      <div className={styles.container}>
        <Scale updateYear={this.updateYear} />
        {artworkInfo && (
          <Artwork
            artworkInfo={artworkInfo}
            loading={loading}
            imageLoaded={this.imageLoaded}
          />
        )}
        {newsInfo && !loading && <Marquee newsInfo={newsInfo} />}
      </div>
    );
  }
}

export default App;
