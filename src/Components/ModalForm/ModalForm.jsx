import React, { Fragment, useState, useEffect } from 'react';
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

function ModalForm(props) {
  const {
    open,
    handleClose,
    getAllSongs,
    updateSong,
    selection,
    songs,
    handleToastNotification,
  } = props;

  let initialValue = {
    title: '',
    artist: '',
    album: '',
    release_date: moment(new Date()).format('YYYY-MM-DD'),
    genre: '',
  };

  // console.log({...initialValue})
  // const [initialValue, setInitialValue] = useState({
  //   title: '',
  //   artist: '',
  //   album: '',
  //   date: moment(new Date()).format('YYYY-MM-DD'),
  //   genre: '',
  // });

  const [values, setValues] = useState({
    title: 'lol',
    artist: '',
    album: '',
    release_date: moment(new Date()).format('YYYY-MM-DD'),
    genre: '',
  });

  console.log(values);
  const [title, setTitle] = useState(values.title);
  const [artist, setArtist] = useState(values.artist);
  const [album, setAlbum] = useState(values.album);
  const [date, setDate] = useState(values.date);
  const [genre, setGenre] = useState(values.genre);

  let index = 0;

  useEffect(() => {
    if (updateSong) {
      index = songs.findIndex((song) => song.id === selection[0]);
      let selectedRecord = songs[index];
      console.log('Record: ', {...selectedRecord});
      setValues({...initialValue,...selectedRecord});
      

          setTitle(songs[index].title);
          setArtist(songs[index].artist);
          setAlbum(songs[index].album);
          setDate(songs[index].release_date);
          setGenre(songs[index].genre);
    }
  }, [props, setValues]);

  console.log(values);
  // Deal with changes to ANY field on the form
  // const handleInputChange = (event) => {
  //   const { name, value } = event.target
  //   setValues({
  //     ...values,
  //     [name]: value,
  //   })
  //   // add any field validation here
  // }

  const handleUpdateFieldsChange = (e) => {
    const { name, value } = e.target;
    console.log(e);
    setValues({
      [name]: value,
    });

    // initialValue[name] = value

    console.log(values);
  };

  const handleAddSong = async () => {
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
      handleToastNotification('success', 'Song was added!');
    } catch (e) {
      return handleToastNotification('error', e.message);
    }
  };
  const handleUpdateSong = async () => {
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
      handleToastNotification('success', 'Song was updated!');
    } catch (e) {
      return handleToastNotification('error', e.message);
    }
  };

  const handleOnSubmit = () => {
    if (updateSong) {
      handleUpdateSong();
    } else {
      handleAddSong();
    }
    handleClose();
  };

  const styleForMuiBox = {
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
  console.log(title);
  return (
    <Fragment>
      <Modal open={open} onClose={handleClose}>
        <Box sx={styleForMuiBox}>
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
              onChange={(e) => {
                setTitle(e.target.value)
              }}
            />
            <TextField
              name='artist'
              label='artist'
              variant='standard'
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
            />
            <TextField
              name='album'
              label='album'
              variant='standard'
              value={album}
              onChange={(e) => setAlbum(e.target.value)}
            />
            <TextField
              name='genre'
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
              {updateSong?'update': 'add'}
            </Button>
          </Typography>
        </Box>
      </Modal>
    </Fragment>
  );
}

export default ModalForm;
