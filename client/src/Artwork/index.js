import React from 'react';
import styles from './style.module.css';
import Img from 'react-image';

const Spinner = () => {
  return (
    <div className={styles.spinnerContainer}>
      <i id={styles.spinner} className="fas fa-palette fa-spin fa-6x" />
    </div>
  );
};

// build artists string accounting for possibility of multiple artists/ artist is unknown
const getArtists = artist => {
  let artistsString = '';
  if (!artist) {
    return 'Unidentified Artist';
  }
  artist.forEach((person, i) => {
    const name = person.name;
    if (i === 0) {
      artistsString = name;
    } else {
      artistsString = artistsString + ', ' + name;
    }
  });
  return artistsString;
};

const Artwork = ({ artworkInfo }) => {
  const {
    title,
    description,
    year,
    dimensions,
    imageUrl,
    artist
  } = artworkInfo;
  const artists = getArtists(artist);
  return (
    <div className={styles.container}>
      <Img src={imageUrl} alt="" className={styles.image} loader={Spinner()} />
      <div className={styles.descriptionContainer}>
        <p className={styles.artists}>{artists}</p>
        <p className={styles.title}>{`${title}, ${year}`}</p>
        <p className={styles.description}>{description}</p>
        <p className={styles.dimensions}>{dimensions}</p>
      </div>
    </div>
  );
};

export default Artwork;
