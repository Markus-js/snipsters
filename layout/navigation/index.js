import React from 'react';
import Link from 'next/link';
import Image from 'next/image'
import { useSession } from 'next-auth/react';
import { Tooltip } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home'
import CreateIcon from "@mui/icons-material/NoteAddRounded";
import ProfileIcon from '@mui/icons-material/AccountCircle'

import logo from 'assets/images/cool_s.png'


// STYLE
import style from './navigation.module.scss';
import { Box } from '@mui/material';
const Navigation = () => {
  const { data: session } = useSession();
  return (
    <Box className={style.nav}  >
      <div className={style.navLinks}>
        <Link href="/" >
          <a className={style.navLinks__link} >
            <Tooltip title="Home" placement='right'>
              <HomeIcon className={style.navLinks__icon} />
            </Tooltip>
          </a>
        </Link>
        {session &&
        <>
          <Link href="/create">
            <a className={style.navLinks__link}>
              <Tooltip title="Create new snippet" placement='right'>
                <CreateIcon className={style.navLinks__icon} />
              </Tooltip>
            </a>
          </Link>
          <Link href={`/users/${session.user.id}`}>
            <a className={style.navLinks__link}>
              <Tooltip title="My profile" placement='right'>
                <ProfileIcon className={style.navLinks__icon} />
              </Tooltip>
            </a>
          </Link>
        </>
        }
      </div>
    </Box>
  )
}

export default Navigation