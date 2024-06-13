// src/components/atoms/DialogBox.js
import React from 'react';
import { Dialog, DialogContent, DialogContentText, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

const DialogBox = ({ open, message, onClose }) => {
  const history = useHistory();

  const handleClose = () => {
    onClose();
    history.push('/');
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
        <Button onClick={handleClose}>Close</Button>
      </DialogContent>
    </Dialog>
  );
};

export default DialogBox;
