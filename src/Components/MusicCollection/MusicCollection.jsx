import React, { Fragment, useEffect, useState } from 'react';
import Axios from '../../utils/Axios';
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ModalForm from '../ModalForm/ModalForm';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';

function MusicCollection() {
  const [songs, setSongs] = useState([]);
  const [updateTable, setUpdateTable] = useState(false);
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [selection, setSelection] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getAllSongs();
    setUpdateTable(false);
  }, [updateTable, update]);

  const getAllSongs = async () => {
    try {
      const res = await Axios.get('/music/');
      setSongs(res.data);
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
  const deleteSongs = async () => {
    try {
      selection.forEach((songId) => {
        Axios.delete(`/music/${songId}/`);
      });
      await getAllSongs();
      setUpdateTable(true);
      toast.success('Songs have been deleted!', {
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

  const handleDelete = () => {
    if (!selection || selection.length < 1) {
      return toast.error('You need to make a selection!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    confirmAlert({
      title: 'Confirm to submit',
      message: `Are you sure you want to delete the following songs? Song with IDs - (${selection}). This operation can not be undone.`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            deleteSongs();
          },
        },
        {
          label: 'No',
        },
      ],
    });
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
  ];

  if (!songs) {
    return <div>No Songs</div>;
  } else {
    return (
      <Fragment>
        <div
          style={{
            height: 600,
            width: '80%',
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
            onSelectionModelChange={(itemsSelected) =>
              setSelection(itemsSelected)
            }
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
          <Button
            variant='contained'
            onClick={() => {
              if (!selection) {
                return toast.error(
                  'Please make a single selection to update!',
                  {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  }
                );
              } else if (selection.length > 1) {
                return toast.error(
                  'Please make only one selection at a time!',
                  {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  }
                );
              }
              setUpdate(true);
              handleOpen();
            }}
          >
            Update Song
          </Button>
          <Button variant='contained' onClick={handleDelete}>
            Delete Song(s)
          </Button>
        </Stack>
        <ModalForm
          open={open}
          update={update}
          selection={selection}
          setUpdate={setUpdate}
          handleClose={() => {
            handleClose();
            setUpdate(false);
          }}
          getAllSongs={getAllSongs}
          songs={songs}
          toast={toast}
        />
      </Fragment>
    );
  }
}

export default MusicCollection;
