import React, { useState } from "react";
import Image from "next/image";
import Follow from "features/Follow";
import { Box, Avatar, Card, CardMedia, CardContent, Typography, CardActions, Divider } from "@mui/material";
import bannerImg from 'assets/images/generic-banner.jpeg';

export default function ProfileCard({ user }) {
  const [currentUser, setCurrentUser] = useState(user);

  return (
    <Card sx={{minWidth: '20rem'}}>
      <CardMedia title="banner">
        <Image layout="intrinsic" src={bannerImg} alt="generic skyline"/>
      </CardMedia>

      <CardContent sx={{padding: '0 1rem'}}>
        <Avatar src={user.image} alt={user.name} sx={{
          height: '7rem',
          width: '7rem',
          transform: 'translateY(-4rem)',
          display: 'block',
          marginLeft: 'auto',
          border: `5px solid rgb(40, 42, 47)`,
        }}/>
        <Box sx={{
          transform: 'translate(0rem, -5rem)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <Typography component='a' href={`/users/${user.id}`} fontWeight='bolder' color='white'>
            {user.name}
          </Typography>
          <Divider />
          <Typography component="p">{
            user.bio ? user.bio: "Hello! I am new snipster.io user. I am learning how to code."}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{display: 'flex', justifyContent: 'flex-end', padding: '1rem'}}>
        <Follow user={currentUser} setUser={setCurrentUser} />
      </CardActions>
    </Card>
  );
}
