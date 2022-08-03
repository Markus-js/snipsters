import React from 'react';
import { useSession } from 'next-auth/react';
import {Box, Paper, Typography} from '@mui/material';
import Modal from '@mui/material/Modal';
import CodeEditor from 'components/CodeMirror';
import CreatedBy from './components/CreatedBy';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxHeight: '80vh',
  maxWidth: '80vw',
  minWidth: '30rem',
  bgcolor: "background.default",
  boxShadow: 24,
  borderRadius: "0.5rem",
  display: "flex",
  flexDirection: "column",
};

export default function SnippetModal({ snippet, setSnippet, open, setOpen }) {
  const { data: session } = useSession();
  const handleClose = () => setOpen(false);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Paper sx={style}>
        <Box sx={{ padding: '1rem', display: 'flex', justifyContent: 'space-between' }} bgcolor='background.paper'>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography sx={{padding: '1rem'}} component='div' variant='h4' >{snippet.title}</Typography>
            <Typography sx={{padding: '1rem'}} component='div' variant='p' >{snippet.description}</Typography>
          </Box>
          <CreatedBy snippet={snippet} setSnippet={setSnippet} session={session} />
        </Box>
        <CodeEditor code={snippet.content} language={snippet.language} editable={false} />
      </Paper>
    </Modal>
  );
}