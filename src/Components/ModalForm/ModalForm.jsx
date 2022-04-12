import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Axios from '../../utils/Axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';

function ModalForm(props) {
  const { open, handleClose, getAllSongs, update, selection, songs } = props;

  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [date, setDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
  const [genre, setGenre] = useState('');

  let index = 0;

  useEffect(() => {
    if (update) {
      index = songs.findIndex((song) => song.id === selection[0]);

      setTitle(songs[index].title);
      setArtist(songs[index].artist);
      setAlbum(songs[index].album);
      setDate(songs[index].release_date);
      setGenre(songs[index].genre);
    }
  }, [props]);

  // Deal with changes to ANY field on the form
  // const handleInputChange = (event) => {
  //   const { name, value } = event.target
  //   setValues({
  //     ...values,
  //     [name]: value,
  //   })
  //   // add any field validation here
  // }

  const addSong = async () => {
    let newSong = {
      title: title,
      artist: artist,
      album: album,
      release_date: date,
      genre: genre,
    };
    try {
      const res = await Axios.post('/music/', newSong);
      await getAllSongs();
      setTitle('');
      setArtist('');
      setAlbum('');
      setDate(moment(new Date()).format('YYYY-MM-DD'));
      setGenre('');
      toast.success('Song was added!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (e) {
      return toast.error(e.message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const updateSong = async () => {
    let updatedSong = {
      title: title,
      artist: artist,
      album: album,
      release_date: date,
      genre: genre,
    };
    try {
      const res = await Axios.put(`/music/${selection[0]}/`, updatedSong);
      await getAllSongs();
      setTitle('');
      setArtist('');
      setAlbum('');
      setDate(moment(new Date()).format('YYYY-MM-DD'));
      setGenre('');
      toast.success('Song was updated!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (e) {
      return toast.error(e.message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleOnSubmit = () => {
    if (update) {
      updateSong();
    } else {
      addSong();
    }
    handleClose();
  };

  const style = {
    position: 'absolute',
    top: '35%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height: 400,
    backgroundColor: '#868686',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      {' '}
      <ToastContainer />
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography style={{ fontSize: '2rem', textAlign: 'center' }}>
            {(selection && selection.length > 0 && 'Update Song') ||
              'Add New Song'}
          </Typography>
          <Box
            component='form'
            sx={{
              '& .MuiTextField-root': { mx: 7, mt: 4, width: '25ch' },
            }}
            noValidate
            autoComplete='off'
          >
            <TextField
              name='title'
              label='song title'
              variant='standard'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              label='artist'
              variant='standard'
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
            />
            <TextField
              label='album'
              variant='standard'
              value={album}
              onChange={(e) => setAlbum(e.target.value)}
            />
            <TextField
              label='genre'
              variant='standard'
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                name='release_date'
                label='release date'
                value={date}
                inputFormat='yyyy-MM-dd'
                onChange={(newDate) => {
                  setDate(moment(newDate).format('YYYY-MM-DD'));
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>

          <Typography style={{ textAlign: 'center' }} sx={{ mt: 10 }}>
            <Button
              style={{ width: '6rem' }}
              variant='contained'
              onClick={() => handleOnSubmit()}
            >
              add
            </Button>
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export default ModalForm;
