import { Stack, Box, Typography, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import FeaturedUser from './components/FeaturedUser';
import { getFeaturedUsers } from './utils/featuredUtils';

export default function FeaturedUsers() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    getFeaturedUsers()
      .then(users => {
        setUsers(users)
      })
  }, [])
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
      <Paper sx={{ padding: '1rem', textAlign: 'center' }}>
        <Typography variant='h5'>Most Upvoted Users</Typography>
      </Paper>
      <Stack gap='1rem' sx={{ overflowY: 'auto' }} scroll='paper'>
        {users && users
          .slice(0, 5)
          .map((user, index) => (
          <FeaturedUser key={user.id} featuredUser={user} index={index} />
        ))}
      </Stack>
    </Box>
  )
}