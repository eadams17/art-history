import React from 'react';
import styles from './style.module.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const YEARS = {
  0: 1900,
  10: 1910,
  20: 1920,
  30: 1930,
  40: 1940,
  50: 1950,
  60: 1960,
  70: 1970,
  80: 1980,
  90: 1990,
  100: 2000
};

const Scale = ({ updateYear }) => {
  return (
    <div className={styles.container}>
      <div className={styles.label}>
        Click on any year to see artwork and actual New York Times headlines
        from that time period.
      </div>
      <Slider
        min={0}
        defaultValue={0}
        marks={{
          0: YEARS[0],
          10: YEARS[10],
          20: YEARS[20],
          30: YEARS[30],
          40: YEARS[40],
          50: YEARS[50],
          60: YEARS[60],
          70: YEARS[70],
          80: YEARS[80],
          90: YEARS[90],
          100: YEARS[100]
        }}
        step={null}
        onChange={value => updateYear(YEARS[value])}
        trackStyle={{ backgroundColor: '#1FD8FC' }}
        className={styles.scale}
      />
    </div>
  );
};

export default Scale;
