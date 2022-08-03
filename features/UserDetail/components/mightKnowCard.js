
import React, { useState, useEffect } from "react";
import { ArrowDropUp, ArrowDropDown } from "@mui/icons-material";
import Link from "next/link";
// COMPONENTS
import Follow from 'features/Follow';
// UTILS
import { usersNotFolloingBack } from "../utils/followingUtils";
// STYLE
import style from "./mightknow.module.scss";
import { Box, Avatar, Typography} from "@mui/material";


export default function MightKnowCard({user, friend}) {
    const [follow, setFollow] = useState(friend);
  return (
    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: "1rem" }} key={friend.id}>
    <Link href={`/users/${friend.id}`} key={friend.id}>
      <Box
        sx={{ display: "flex", gap: "1rem", alignItems: "center" }}
        >
        <Avatar sx={{ width: 42, height: 42 }} src={friend.image} />
        <Typography
          component="a"
          href={`/users/${user.id}`}
          variant="h5"
          color="secondary"
          >
          {friend.name}
        </Typography>
      </Box>
    </Link>
      <Follow user={follow} setUser={setFollow}  />
  </Box>
  )
}
