/* eslint-disable react/prop-types */
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HiDocumentMagnifyingGlass } from 'react-icons/hi2';
import {
  SearchForm,
  SearchFormButton,
  SearchFormInput,
  SearchbarHeader,
} from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  const [searchQueru, setSearchQueru] = useState('');

  const handleNameChange = event => {
    setSearchQueru(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (searchQueru.trim() === '') {
      toast.error('Щось напиши');
      return;
    }

    onSubmit(searchQueru);
    setSearchQueru('');
  };

  return (
    <SearchbarHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormInput
          type="text"
          placeholder="Search images and photos"
          name="searchQueru"
          value={searchQueru}
          onChange={handleNameChange}
        />
        <SearchFormButton type="submit">
          <span>
            <HiDocumentMagnifyingGlass size="40" />
          </span>
        </SearchFormButton>
      </SearchForm>
    </SearchbarHeader>
  );
};

export default Searchbar;
