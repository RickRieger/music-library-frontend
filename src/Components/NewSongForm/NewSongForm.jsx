import React, { useState, Fragment } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function NewSongForm() {
  const [title, setTitle] = useState();
  const [artist, setArtist] = useState();
  const [album, setAlbum] = useState();
  const [date, setDate] = useState();
  const [genre, setGenre] = useState();

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
    <Fragment>
      <Box sx={style}>
        <Typography
          style={{ fontSize: '2rem', textAlign: 'center' }}
        >
          Enter Song Info
        </Typography>
        <Typography  variant='h6' component='h2'>
          <Box
            component='form'
            sx={{
              '& .MuiTextField-root': { mx: 7, mt: 4, width: '25ch' },
            }}
            noValidate
            autoComplete='off'
          >
            <div>
              <TextField
                label='song title'
                variant='standard'
                onChange={(e) => console.log(e.target.value)}
              />
              <TextField
                label='artist'
                variant='standard'
              />
              <TextField label='album' variant='standard' />
              <TextField
                label='release date'
                variant='standard'
              />
              <TextField label='genre' variant='standard' />
            </div>
          </Box>
        </Typography>
        <Typography
          style={{ textAlign: 'center' }}
          sx={{ mt: 10 }}
        >
          <Button style={{ width: '6rem' }} variant='contained'>
            add
          </Button>
        </Typography>
      </Box>
    </Fragment>
  );
}

export default NewSongForm;
