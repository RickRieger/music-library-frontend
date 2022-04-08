import React, { Fragment, useEffect, useState } from 'react';
import Axios from '../../utils/Axios';
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ModalForm from '../ModalForm/ModalForm';

function MusicCollection() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    getAllSongs();
  }, []);

  const getAllSongs = async () => {
    try {
      const res = await Axios.get('/music/');
      setSongs(res.data);
      console.log(res.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Song Title', width: 180 },
    { field: 'artist', headerName: 'artist', width: 180 },
    { field: 'album', headerName: 'album', width: 180 },
    { field: 'release_date', headerName: 'release date', width: 180 },
    { field: 'genre', headerName: 'genre', width: 180 },
    { field: 'like_count', headerName: 'likes', width: 180 },
    { field: 'dislike_count', headerName: 'dislikes', width: 180 },
  ];

  if (!songs) {
    return <div>No Songs</div>;
  } else {
    return (
      <Fragment>
        <div
          style={{
            height: 400,
            width: '50%',
            margin: 'auto',
            marginTop: '200px',
            backgroundColor: '#6a9aaa',
          }}
        >
          <DataGrid
            rows={songs}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>
        <Stack
          spacing={2}
          direction='row'
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '50px',
          }}
        >
          <Button variant='contained' onClick={handleOpen}>
            Add Song
          </Button>
          <Button variant='contained'>Update Song</Button>
          <Button variant='contained'>Delete Song</Button>
        </Stack>
        <ModalForm open={open} handleClose={handleClose} />
      </Fragment>
    );
  }
}

export default MusicCollection;
