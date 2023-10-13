import React, { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImages } from 'api/ImgFinderApi';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!query) return;

      try {
        setLoading(true);
        const { totalHits, hits } = await fetchImages(query, page);

        if (totalHits === 0) {
          toast.error('Nothing was found for your request');
          return;
        }

        if (page === 1) {
          setImages(hits);
          setTotalHits(totalHits - hits.length);
        } else {
          setImages(prevImages => [...prevImages, ...hits]);
          setTotalHits(prevTotalHits => prevTotalHits - hits.length);
        }
      } catch (error) {
        toast.error(`Oops! Something went wrong! ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, page]);

  const handleQuerySubmit = query => {
    setQuery(query);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <Searchbar onSubmit={handleQuerySubmit}></Searchbar>
      {images && <ImageGallery images={images}></ImageGallery>}
      {!!totalHits && <Button onLoadMore={handleLoadMore}></Button>}
      {isLoading && <Loader />}

      <ToastContainer autoClose={2000} />
    </>
  );
};
