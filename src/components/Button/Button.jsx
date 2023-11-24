import React, { Component } from 'react';
import styles from './Button.module.css';

class Button extends Component {
  render() {
    const { onClick, loadMore } = this.props;

    return loadMore ? (
      <button onClick={onClick} className={styles.loadMoreButton}>
        Load More
      </button>
    ) : null;
  }
}

export default Button;
