import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import UserCard from './components/UserCard';
import { Button, Box } from '@mui/material'
import LogoutIcon from '@mui/icons-material/LogoutRounded';
import LoginIcon from '@mui/icons-material/LoginRounded';
// STYLE
import style from './login.module.scss';

export default function Login() {
  const { data: session } = useSession();
  return (
        <Box className={style.login_container}>
          {session && <UserCard user={session.user} />}
          {session ?
          <Button startIcon={<LogoutIcon/>} variant="contained" onClick={() => signOut()}>
            Sign out
          </Button>
          :
          <Button startIcon={<LoginIcon />} variant="contained" onClick={() => signIn()}>
            Sign in
          </Button>}
        </Box>
    )
}
