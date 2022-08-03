import { Box, Paper, Typography, Avatar, Badge, Chip, Card } from '@mui/material';
import UserCard from 'components/UserCard';
import React, { useState } from 'react';
import { totalUpvotes, totalFavorites } from '../utils/featuredUtils';
import style from './featuredUser.module.scss'

export default function FeaturedUser({ featuredUser, index }) {
  const [user, setUser] = useState(featuredUser);
  return (
    <Paper elevation={4} className={style.featuredUser}>
      <Box sx={{ display: 'flex', justifyContent:'space-between', alignItems: 'center' }}>
        <Box sx={{display: 'flex', alignItems: 'center', padding: '1rem'}}>
          <Avatar>{index + 1}</Avatar>
        </Box>
        <Box component="span" className={style.stats}>
          <Chip avatar={<Avatar>{totalUpvotes(user)}</Avatar>} label={` votes`} sx={{display: 'flex', justifyContent: 'flex-start'}}/>
          <Chip avatar={<Avatar>{totalFavorites(user)}</Avatar>} label={` favorites`} />
        </Box>
      </Box>
        <Box minWidth={'15rem'}>
          <UserCard user={user} setUser={setUser} index={index}/>
        </Box>
    </Paper>
  )
}