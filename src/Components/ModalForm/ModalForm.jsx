import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function ModalForm({open, handleClose}) {
  const style = {
    position: 'absolute',
    top: '35%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height: 400,
    bgcolor: '#868686',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Typography
          id='modal-modal-description'
          style={{ fontSize: '2rem', textAlign: 'center' }}
        >
          Enter Song Info
        </Typography>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
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
                id='standard-basic'
                label='song title'
                variant='standard'
              />
              <TextField
                id='standard-basic'
                label='artist'
                variant='standard'
              />
              <TextField id='standard-basic' label='album' variant='standard' />
              <TextField
                id='standard-basic'
                label='release date'
                variant='standard'
              />
              <TextField id='standard-basic' label='genre' variant='standard' />
            </div>
          </Box>
        </Typography>
        <Typography
          id='modal-modal-description'
          style={{ textAlign: 'center' }}
          sx={{ mt: 10 }}
        >
          <Button style={{ width: '6rem' }} variant='contained'>
            add
          </Button>
        </Typography>
      </Box>
    </Modal>
  );
}

export default ModalForm;
