import React, { Component } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

class App extends Component {
  state = {
    apiKey: '40004201-26b20f21540493f4188682e6c',
    perPage: 12,
    images: [],
    searchTerm: '',
    page: 1,
    isLoading: false,
    selectedImage: null,
  };

  componentDidMount() {
    this.fetchImages();
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchTerm } = this.state;

    if (prevState.searchTerm !== searchTerm) {
      this.setState({ images: [], page: 1 }, () => {
        this.fetchImages();
      });
    }
  }

  fetchImages = async () => {
    const { apiKey, perPage, searchTerm, page } = this.state;

    try {
      this.setState({ isLoading: true });

      const response = await fetch(
        `https://pixabay.com/api/?q=${searchTerm}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${perPage}`
      );

      if (!response.ok) {
        throw new Error('Error fetching images from Pixabay API');
      }

      const data = await response.json();
      const newImages = data.hits.map(hit => ({
        id: hit.id,
        webformatURL: hit.webformatURL,
        largeImageURL: hit.largeImageURL,
      }));

      this.setState(prevState => ({
        images: [...prevState.images, ...newImages],
      }));
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSearchSubmit = newSearchTerm => {
    this.setState({ searchTerm: newSearchTerm, images: [], page: 1 });
  };

  loadMoreImages = () => {
    this.setState(
      prevState => ({ page: prevState.page + 1 }),
      () => {
        this.fetchImages();
      }
    );
  };

  openModal = image => {
    this.setState({ selectedImage: image });
  };

  closeModal = () => {
    this.setState({ selectedImage: null });
  };

  render() {
    const { images, isLoading, selectedImage } = this.state;

    return (
      <div>
        <SearchBar onSubmit={this.handleSearchSubmit} />
        <ImageGallery images={images} openModal={this.openModal} />
        {images.length > 0 && (
          <Button onClick={this.loadMoreImages} loadMore={true} />
        )}
        {isLoading && <Loader />}
        {selectedImage && (
          <Modal
            imageUrl={selectedImage.largeImageURL}
            altText={selectedImage.id}
            onClose={this.closeModal}
          />
        )}
      </div>
    );
  }
}

export default App;
