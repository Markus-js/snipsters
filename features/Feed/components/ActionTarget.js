import React, { useState, useEffect } from 'react';
import UserCard from 'components/UserCard';
import SnippetCard from 'components/SnippetCard';
import SnippetModal from 'features/SnippetModal';
import { Box } from '@mui/material';

export default function ActionTarget({ action , targetType }) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [snippet, setSnippet] = useState(null);
  const [comment, setComment] = useState(null);
  useEffect(() => {
    switch (targetType) {
      case 'user':
        setSnippet(null);
        setComment(null)
        setUser(action.targetUser);
        break;
      case 'snippet':
        setUser(null);
        setComment(null);
        setSnippet(action.targetSnippet);
        break;
      case 'comment':
        setUser(null);
        setSnippet(null);
        setComment(action.targetComment);
      default:
        setUser(null);
        setSnippet(null);
        setComment(null);
    }
  }, [action]);
  return (
    user &&
      <Box sx={{display: 'flex', gap: '1rem', width: '100%', padding: '1rem'}}>
        <UserCard user={user} setUser={setUser} />
      </Box>
    || snippet &&
      <Box sx={{display: 'flex', gap: '1rem', width: '100%', padding: '1rem'}}>
        <SnippetCard snippet={snippet} setSnippet={setSnippet} open={open} setOpen={setOpen} />
        <SnippetModal snippet={snippet} setSnippet={setSnippet} open={open} setOpen={setOpen} />
      </Box>
    || comment &&
      <Box sx={{display: 'flex', gap: '1rem', width: '100%', padding: '1rem'}}>
        PLACEHOLDER
      </Box>
  )
}
