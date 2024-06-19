import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DeleteChatModal({ open, onClose, onDelete }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Chat</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this chat? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onDelete} color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
