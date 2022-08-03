import { Divider, Paper, Stack } from '@mui/material';
import React, { useState, useEffect } from 'react';
import FeedCard from './components/FeedCard';

export default function Feed({ user }) {
  const [feed, setFeed] = useState(null);

  useEffect(() => {
    if (user) {
      fetch(`/api/users/${user.id}/feed`)
        .then(res => res.json())
        .then(data => {
          setFeed(data)
        })
    }
  }, [user]);

  return (
    <Stack spacing={1}>
      {feed && feed.map(action => (
        <FeedCard key={action.id} action={action} />
      ))}
    </Stack>
  );
}