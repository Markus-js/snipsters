import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { getSnippetAuthor } from '../../Follow/utils/previewUtils';
import UserCard from '/components/UserCard';
import ButtonGroup from 'features/SnippetModal/components/ButtonGroup';

export default function CreatedBy({ snippet, setSnippet, session }) {
  const [author, setAuthor] = useState(snippet.author)
  useEffect(() => {
    getSnippetAuthor(snippet.author.id)
      .then(data => setAuthor(data))
  }, [snippet])
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <UserCard user={author} setUser={setAuthor}/>
      <ButtonGroup snippet={snippet} setSnippet={setSnippet} session={session} />
    </Box>
  )
}
