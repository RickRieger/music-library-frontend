import React from 'react';
import Modal from '@mui/material/Modal';
import NewSongForm from '../NewSongForm/NewSongForm';


function ModalForm(props) {
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
    >
    {/* <h1>Test</h1> */}
    <NewSongForm /> 
    </Modal>
  );
}

export default ModalForm;
