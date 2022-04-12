import React from 'react';
import MusicCollection from './Components/MusicCollection/MusicCollection';
import NavBar from './Components/NavBar/NavBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className='App'>
      <NavBar />
      <MusicCollection />
      <ToastContainer />
    </div>
  );
}

export default App;
