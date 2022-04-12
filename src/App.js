import React from 'react';
import MusicCollection from './Components/MusicCollection/MusicCollection';
import NavBar from './Components/NavBar/NavBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const handleToastNotification = (type,message)=>{
    if(type === 'success'){
      toast.success(message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }else{
      toast.error(message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  return (
    <div className='App'>
      <NavBar />
      <MusicCollection handleToastNotification={handleToastNotification}/>
      <ToastContainer />
    </div>
  );
}

export default App;
