import React from 'react';
import styles from './style.module.css';

const Artwork = ({ artworkInfo, imageLoaded, loading }) => {
  const {
    title,
    description,
    year,
    dimensions,
    imageUrl,
    artist
  } = artworkInfo;
  const visibility = loading ? 'hidden' : 'visible';

  return (
    <div className={styles.container}>
      {loading && (
        <i id={styles.spinner} className="fas fa-palette fa-spin fa-10x" />
      )}
      <div
        className={styles.descriptionContainer}
        style={{ visibility: visibility }}
      >
        <p className={styles.artists}>{artist}</p>
        <p className={styles.title}>{`${title}, ${year}`}</p>
        <p className={styles.description}>{description}</p>
        <p className={styles.dimensions}>{dimensions}</p>
      </div>
      <img
        src={imageUrl}
        alt=""
        className={styles.image}
        style={{ visibility: visibility }}
        onLoad={() => imageLoaded()}
      />
    </div>
  );
};

export default Artwork;
