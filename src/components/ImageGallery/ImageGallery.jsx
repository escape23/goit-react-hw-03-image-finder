import React, { Component } from 'react';
import styles from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

class ImageGallery extends Component {
  render() {
    const { images } = this.props;

    return (
      <ul className={styles.gallery}>
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            src={image.webformatURL}
            alt={image.id}
          />
        ))}
      </ul>
    );
  }
}

export default ImageGallery;
