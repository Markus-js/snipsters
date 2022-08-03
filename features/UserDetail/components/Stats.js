import React from "react";
import Link from "next/link";
// COMPONENTS
import { Box, Avatar, Chip } from '@mui/material';
// UTIILS
import { getTotalUpvotes } from "../utils/totalUpvotesUtils";
// STYLE
import style from "./stats.module.scss";

export default function Stats({ user }) {
  return (

    <section className={style.container}>
      <Box className={style.stats}>
        {user && <Chip avatar={<Avatar>{user.snippets.length}</Avatar>} label="Snippets" sx={{display: 'flex', justifyContent: 'flex-start', fontSize: "1rem"}}/>}
      </Box>
      <Box className={style.stats}>
        {user && <Chip avatar={<Avatar>{getTotalUpvotes(user)}</Avatar>} label="Total upvotes" sx={{display: 'flex', justifyContent: 'flex-start', fontSize: "1rem"}}/>}
      </Box>
      <Box className={style.stats}>
        <Link href={`/followers/${user.id}`}>
          <Chip avatar={<Avatar>{user.followersIds.length}</Avatar>} label="Followers" sx={{display: 'flex', justifyContent: 'flex-start', fontSize: "1rem"}}/>
        </Link>
      </Box>
      <Box className={style.stats}>
        <Link href={`/following/${user.id}`}>
          <Chip avatar={<Avatar>{user.followingIds.length}</Avatar>} label="Following" sx={{display: 'flex', justifyContent: 'flex-start', fontSize: "1rem"}}/>
        </Link>
      </Box>
    </section>
  );
}
