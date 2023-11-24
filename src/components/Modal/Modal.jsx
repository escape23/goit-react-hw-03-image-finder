import React, { Component } from 'react';
import styles from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('click', this.handleClickOutside);
  }

  handleKeyDown = event => {
    if (event.key === 'Escape') {
      this.props.onClose();
    }
  };

  handleClickOutside = event => {
    const modal = document.querySelector(`.${styles.modal}`);
    if (
      event.target.classList.contains(styles.overlay) ||
      (modal && modal.contains(event.target))
    ) {
      this.props.onClose();
    }
  };

  render() {
    const { imageUrl, altText } = this.props;

    return (
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <img src={imageUrl} alt={altText} />
        </div>
      </div>
    );
  }
}

export default Modal;
