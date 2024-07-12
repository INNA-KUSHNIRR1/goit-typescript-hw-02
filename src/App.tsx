import { FC, useEffect, useState } from 'react';
import './App.css';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import SearchBar from './components/SearchBar/SearchBar';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import fetchImagesFromApi from './api/api';
import RequestNotFound from './components/RequestNotFound/RequestNotFound';
import { Image, ImageModalProps } from './types';

interface Response {
  results: Image[];
  total_pages: number;
}

function App() {
  const [images, setImage] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [srcModal, setSrcModal] = useState<string | null>(null);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [likes, setLikes] = useState<number | null>(null);
  const [author, setAuthor] = useState<string | null>(null);
  const [isBtnDisabled, setIsBtnDisabled] = useState<boolean>(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const { results, total_pages } = await fetchImagesFromApi<Response>(
          query,
          page,
        );
        setImage(prevImages => [...prevImages, ...results]);
        results.length === 0 && setIsEmpty(true);
        results.length > 0 && setIsBtnDisabled(true);

        setTotalPages(total_pages);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    query && fetchImages();
  }, [query, page]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    return (): void => {
      document.body.classList.remove('modal-open');
    };
  }, [isModalOpen]);

  const searchImages = (textInput: string) => {
    setImage([]);
    setPage(1);
    setQuery(textInput);
    setIsEmpty(false);
  };

  const showNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = (likes: number, author: string, srcModal: string): void => {
    setSrcModal(srcModal);
    setAuthor(author);
    setLikes(likes);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSrcModal(null);
    setAuthor(null);
    setLikes(null);
  };

  return (
    <>
      <SearchBar
        submit={searchImages}
        isBtnDisabled={isBtnDisabled}
        setIsBtnDisabled={setIsBtnDisabled}
      ></SearchBar>
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={openModal} />
      )}
      {isEmpty && !isLoading && <RequestNotFound />}
      <ImageModal
        likes={likes}
        srcModal={srcModal}
        author={author}
        isOpen={isModalOpen}
        closeModal={closeModal}
      />
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {images.length > 0 && !isLoading && page < totalPages && (
        <LoadMoreBtn onClick={showNextPage} />
      )}
    </>
  );
}

export default App;
