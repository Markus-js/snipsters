import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { TableCell, TableRow, Chip } from '@mui/material';
import CopyButton from 'components/CopyButton';
import SnippetModal from 'features/SnippetModal/index.js';

export default function SearchResult({ result }) {
  const [open, setOpen] = useState(false);
  const [snippet, setSnippet] = useState(result);
  const handleOpen = () => setOpen(true);
  return (snippet &&
    <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
      <TableCell component="th" scope="row" size='small' onClick={handleOpen} sx={{ cursor: 'pointer' }}>
        {snippet.title}
      </TableCell>
      <TableCell align="left" size='small'>{snippet.language}</TableCell>
      <TableCell align="center" size='small'>
        <Link href={`users/${snippet.author.id}`}>
          <Chip 
            label={snippet.author.name}
            clickable
          />
          </Link>
      </TableCell>
      <TableCell align="center" size='small' sx={{ width: 0}}>{snippet.votesIds.length}</TableCell>
      <TableCell align="center" size='small' sx={{ width: 0}}>{snippet.favouritedByIds.length}</TableCell>
      <TableCell align="center" size='small' sx={{ width: 0}}><CopyButton content={snippet.content} /></TableCell>
      <SnippetModal snippet={snippet} setSnippet={setSnippet} open={open} setOpen={setOpen} />
    </TableRow>
  );
}