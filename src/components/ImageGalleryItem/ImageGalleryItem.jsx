import React, { Component } from 'react';
import Modal from '../Modal/Modal';
import styles from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

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
      this.closeModal();
    }
  };

  handleClickOutside = event => {
    const modal = document.querySelector(`.${styles.modal}`);
    if (
      event.target.classList.contains(styles.overlay) ||
      (modal && modal.contains(event.target))
    ) {
      this.closeModal();
    }
  };

  render() {
    const { src, alt } = this.props;
    const { isModalOpen } = this.state;

    return (
      <>
        <li className={styles.galleryItem} onClick={this.openModal}>
          <img className={styles.imageGalleryItem} src={src} alt={alt} />
        </li>
        {isModalOpen && (
          <Modal imageUrl={src} altText={alt} onClose={this.closeModal} />
        )}
      </>
    );
  }
}

export default ImageGalleryItem;
