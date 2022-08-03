import React, {NavLink} from 'react';
import { Avatar} from '@mui/material';
import { Chip } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
// STYLE
import style from './userCard.module.scss';

function UserCard({user}) {
  const router = useRouter();
  return (
    <Link href={`/users/${user.id}`}>
      <Chip
        label={user.name} 
        variant="outlined" 
        color="secondary"
        clickable
        avatar={<Avatar className={style.card__image} src={user.image} alt={user.name} />}
        />
    </Link>
  )
}

export default UserCard