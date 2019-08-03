import React, { Component } from 'react';
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

class Scale extends Component {
  render() {
    return (
      <div className={styles.container}>
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
          onChange={value => this.props.updateYear(YEARS[value])}
        />
      </div>
    );
  }
}

export default Scale;
