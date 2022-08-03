import React from 'react';
import Link from 'next/link';
import { Box, Typography, Avatar, Chip } from '@mui/material';
import Follow from 'features/Follow';

export default function UserCard({ user, setUser }) {
  return (
    <Box component="span" sx={{width: "100%", height: '100%', display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center', paddingInline: '1rem' }}>
      <Link href={`/users/${user.id}`}>
        <Box sx={{display: 'flex', gap: '1rem', cursor: 'pointer' }}>
          <Avatar sx={{ width: 42, height: 42 }} src={user.image}/>
          <Typography variant="h5" color="secondary">
            {user.name}
          </Typography>
        </Box>
      </Link>
      <Box sx={{display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'flex-end'}}>
        <Chip avatar={<Avatar>{user.followersIds.length}</Avatar>} label={` followers`} />
        <Follow user={user} setUser={setUser} />
      </Box>
    </Box>
  )
}
