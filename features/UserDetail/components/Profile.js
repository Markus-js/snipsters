import React from 'react'
import Stats from "./Stats";
import Follow from "features/Follow";
import Modal from "features/Modal";
import style from "./profile.module.scss";
import { Box } from '@mui/material';
import SnippetList from 'components/SnippetList';
import { useSession } from 'next-auth/react';

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  "&:hover": {
    width: "3.5rem",
    height: "3.5rem",
  },
};

export default function Profile({ user, setUser }) {
  const {data: session} = useSession();

  return (
    <Box>
      <Box className={style.profile}>
        <Box className={style.banner}>
          {session?.user && session.user.id === user.id && 
          <Box className={style.settings}>
            <Modal
              component={"SETTINGS"}
              icon="AiFillEdit"
              style={modalStyle}
             />
          </Box>
          }
          <Box
            component="img"
            className={style.banner__image}
            src="https://images.squarespace-cdn.com/content/v1/538d8f62e4b0f432bcf19df2/1638278992246-ZDVCPGOH4E5JFJ7TGYNA/generic+banner.jpg?format=500w"
            alt="banner"
          />
        </Box>
        <Box sx={{display: "flex", flexDirection: "column", justifyContent: "space-between"}} className={style.user}>
          
          <Box component="img" className={style.user__image} src={user.image} alt={user.name} />
          <Box sx={{display: "flex", justifyContent: "space-between"}}>
          <h2 className={style.user__name}>{user.name}</h2>
            <Follow user={user} setUser={setUser} />
          </Box>
          <p className={style.user__description}>{user.bio}</p>
          <Stats user={user} />
        </Box>
      </Box>
      <SnippetList snippets={user.snippets} />
    </Box>
  );
}
