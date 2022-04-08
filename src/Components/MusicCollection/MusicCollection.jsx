import React, { Fragment, useEffect, useState } from 'react';
import Axios from '../../utils/Axios';
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
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

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Song Title', width: 180 },
    { field: 'artist', headerName: 'artist', width: 180 },
    { field: 'album', headerName: 'album', width: 180 },
    { field: 'release_date', headerName: 'release date', width: 180 },
    { field: 'genre', headerName: 'genre', width: 180 },
    { field: 'like_count', headerName: 'likes', width: 180 },
    { field: 'dislike_count', headerName: 'dislikes', width: 180 },
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params) =>
    //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
  ];

  const rows = songs;

  // const rows = [
  //   { id: 1, songTitle: 'Snow', firstName: 'Jon', age: 35 },
  //   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  //   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  //   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  //   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  //   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  //   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  //   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  //   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  // ];

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
        <Stack spacing={2} direction='row' style={{
          display:'flex',
          justifyContent:'center',
          marginTop:'50px'
        }}>
          <Button variant='contained'>Add Song</Button>
          <Button variant='contained'>Update Song</Button>
          <Button variant='contained'>Delete Song</Button>
        </Stack>
      </Fragment>
    );
  }
}

export default MusicCollection;
