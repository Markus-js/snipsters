import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteSnippet } from './utils/deleteUtils'

export default function Delete({snippetId}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handleDelete = () => {
    deleteSnippet(snippetId)
      .then(({deleted}) => {
        if (deleted) {
          router.reload(window.location.pathname);
          return;
        }
        setOpen(false);
      });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <IconButton onClick={handleClickOpen} color='error'>
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Snippet?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This is permanent
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ margin: '1rem'}} variant='contained' onClick={handleClose}>Cancel</Button>
          <Button sx={{ margin: '1rem'}} variant='contained' onClick={handleDelete} color='error' startIcon={<DeleteIcon />}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
