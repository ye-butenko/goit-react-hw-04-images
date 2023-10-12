import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImages } from 'api/ImgFinderApi';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    totalHits: 0,
    isLoading: false,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({ isLoading: true });

        const { totalHits, hits } = await fetchImages(query, page);

        if (totalHits === 0) {
          toast.error('Nothing was found for your request');
          return;
        }

        this.setState(prevState => ({
          images: page === 1 ? hits : [...prevState.images, ...hits],

          totalHits:
            page === 1
              ? totalHits - hits.length
              : totalHits - [...prevState.images, ...hits].length,
        }));
      } catch (error) {
        toast.error(`Oops! Something went wrong! ${error}`);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleQuerySubmit = query => {
    this.setState({ query, page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, totalHits, isLoading } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleQuerySubmit}></Searchbar>
        {images && <ImageGallery images={images}></ImageGallery>}
        {!!totalHits && <Button onLoadMore={this.handleLoadMore}></Button>}
        {isLoading && <Loader />}

        <ToastContainer autoClose={2000} />
      </>
    );
  }
}
