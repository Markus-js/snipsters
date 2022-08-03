import React, { useState } from 'react';
import {
  TableRow,
  TableCell,
} from '@mui/material';
import CopyButton from '../CopyButton';
import SnippetModal from '../../features/SnippetModal/index.js';

export default function SnippetListItem({ snippet }) {
  const [open, setOpen] = useState(false);
  const [currentSnippet, setCurrentSnippet] = useState(snippet)
  const handleOpen = () => setOpen(true);
  return (currentSnippet &&
    <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
      <TableCell component="th" scope="row" size='small' onClick={handleOpen} sx={{ cursor: 'pointer' }}>
        {snippet.title}
      </TableCell>
      <TableCell align="center" size='small'>{snippet.language}</TableCell>
      <TableCell align="center" size='small' sx={{ width: 0}}>{snippet.votesIds.length}</TableCell>
      <TableCell align="center" size='small' sx={{ width: 0}}>{snippet.favouritedByIds.length}</TableCell>
      <TableCell align="center" size='small' sx={{ width: 0}}><CopyButton content={snippet.content} /></TableCell>
      <SnippetModal snippet={currentSnippet} setSnippet={setCurrentSnippet} open={open} setOpen={setOpen} />
    </TableRow>
  )
}