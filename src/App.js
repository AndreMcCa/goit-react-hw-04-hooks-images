import { useState } from 'react';
import { ToastContainer } from 'react-toastify';

import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery'


function App() {

  const [searchQuery, setSearchQuery] = useState('');

  function handleFormSubmit(value) {
    setSearchQuery(value);
  }

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery searchQuery={searchQuery} />
      <ToastContainer position='top-right' autoClose={2500}/>
    </>
  );
}

export default App;
