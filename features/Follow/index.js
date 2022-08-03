import React, { useState, useEffect } from "react";
import { followUser, followingUser } from "./utils/followUtils";
import { useSession } from "next-auth/react";
import { Button } from "@mui/material";

export default function Follow({ user, setUser }) {
  const { data: session } = useSession();
  const [following, setFollowing] = useState(
    followingUser(user.followersIds, session?.user.id)
  );
  const handleFollow = () => {
    followUser(
      user.id,
      session.user.id,
      following ? "UNFOLLOW" : "FOLLOW"
    ).then((updatedUser) => {
      setUser(updatedUser);
    });
  };
  useEffect(() => {
    setFollowing(followingUser(user.followersIds, session?.user.id));
  }, [user]);
  return (
    <>
      {user.id !== session?.user.id && session && (
        <Button
        onClick={handleFollow}
        color={following ? "secondary" : "primary"}
        variant={following ? "outlined" : "contained"}
        sx={{ width: '6rem'}}
        >
        {following ? "unfollow" : "follow"}
        </Button>
        )}
    </>
  );
}
