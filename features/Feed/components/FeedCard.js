import React from 'react';
import Link from 'next/link';
import { Paper, Box, Typography, Avatar, Divider } from '@mui/material';
import { getActionData } from '../utils/feedUtils';
import ActionTarget from './ActionTarget';

export default function FeedCard({ action }) {
  const actionData = getActionData(action);
  return (
    <Paper sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box sx={{display: 'flex', gap: '1rem', alignContent: 'center', width: '100%', padding: '1rem'}}>
        <Link href={`/users/${action.actor.id}`} >
          <Box sx={{display: 'flex', gap: '1rem', alignContent: 'baseline', cursor: 'pointer'}}>
            <Avatar sx={{ width: 32, height: 32, padding: 0 }} src={action.actor.image} />
            <Typography variant="h5" color="secondary">
              {`${action.actor.name} `}
            </Typography>
          </Box>
        </Link>
        <Typography component='span' variant='h6'>
          {`${actionData.text}:`}
        </Typography>
      </Box>
      <Divider orientation='horizontal' sx={{ width: '95%' }}/>
      <ActionTarget action={action} targetType={actionData.target} />
    </Paper>
  )
}