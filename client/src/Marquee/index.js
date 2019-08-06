import React from 'react';
import styles from './style.module.css';

// build headlines string for marquee
const getHeadlines = newsInfo => {
  let headlinesString = '';
  newsInfo.forEach((headline, i) => {
    if (i === 0) {
      headlinesString = headline;
    } else {
      headlinesString = headlinesString + ' * ' + headline;
    }
  });
  return headlinesString;
};

const Marquee = ({ newsInfo }) => {
  const headlines = getHeadlines(newsInfo);
  return (
    <div className={styles.container}>
      <p className={styles.headlines}>{headlines}</p>
    </div>
  );
};

export default Marquee;
