import React, { Component } from 'react';
import { Puff } from 'react-loader-spinner';
import styles from './Loader.module.css';

class Loader extends Component {
  render() {
    return (
      <div className={styles.loaderContainer}>
        <Puff
          height="80"
          width="80"
          radius={1}
          color="#adcfd8"
          ariaLabel="puff-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }
}

export default Loader;
