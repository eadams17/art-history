import React from 'react';
import styles from './style.module.css';

function Artwork({ artworkInfo }) {
  return (
    <div className={styles.container}>
      <img src={artworkInfo.imageUrl} alt="" className={styles.image} />
      <p>{artworkInfo.description}</p>
    </div>
  );
}

export default Artwork;
