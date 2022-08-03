import React from 'react';
import { Box, Typography, Avatar, Chip } from '@mui/material';

export default function SnippetCard({ snippet, setSnippet, open, setOpen }) {
  const handleOpen = () => setOpen(true);
  return (
    <Box component="span" sx={{width: "100%", height: '100%', display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center' }}>
      <Box sx={{display: 'flex', gap: '1rem'}}>
        <Typography component='div' variant="h5" color="secondary" onClick={handleOpen} sx={{ cursor: 'pointer' }}>
          {snippet.title}
        </Typography>
        <Chip label={snippet.language} />
      </Box>
      <Box sx={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
        <Chip avatar={<Avatar>{snippet.votesIds.length}</Avatar>} label={` upvotes`} />
        <Chip avatar={<Avatar>{snippet.favouritedByIds.length}</Avatar>} label={` favorites`} />
      </Box>
    </Box>
  )
}
