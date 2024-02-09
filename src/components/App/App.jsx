import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import { AppStyled } from './App.styled';
import { fetchImages } from 'api';
import Loader from 'components/Loader/Loader';
import { GlobalStyle } from 'components/GlobalStyle';

const App = () => {
  const [searchQueru, setSearchQueru] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonShow, setIsButtonShow] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (searchQueru === '') {
      return;
    }

    async function getGallery() {
      try {
        setIsLoading(true);

        const newSearchQuery = searchQueru.split('/')[1];

        const { hits, totalHits } = await fetchImages(newSearchQuery, page);

        if (!totalHits) {
          setIsButtonShow(false);
          return toast.warn(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }

        setIsButtonShow(true);
        setImages(prevImages => [...prevImages, ...hits]);
      } catch (error) {
        setIsButtonShow(false);
        toast.error(
          'Opps! Somathing went wrong! Please try reloading this page'
        );
      } finally {
        setIsLoading(false);
      }
    }

    getGallery();
  }, [searchQueru, page]);

  const handleFormSubmit = newSearchQueru => {
    setSearchQueru(`${Date.now()}/${newSearchQueru}`);
    setPage(1);
    setImages([]);
    setIsButtonShow(false);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
    setIsButtonShow(false);
  };

  return (
    <AppStyled>
      <Searchbar onSubmit={handleFormSubmit} />

      {images.length > 0 && <ImageGallery images={images} />}
      {isLoading && <Loader />}
      {isButtonShow && <Button onClickButton={handleLoadMore} />}
      <ToastContainer autoClose={3000} />
      <GlobalStyle />
    </AppStyled>
  );
};

export default App;
