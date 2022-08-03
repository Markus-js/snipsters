import React, { useState, useEffect, useRef } from "react";
import style from "./followingDetails.module.scss";
// UTIILS
import { getUser } from "./utils/getUser";
// COMPONENTS
import Card from "components/Card";
import { Paper, InputBase } from "@mui/material";

export default function FollowingDetails({ user }) {
  // const [following, setFollowing] = useState(user.following);
  const [following, setFollowing] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const inputRef = useRef(null);

  const handleSearch = () => {
    const searchTerm = inputRef.current.value.toLowerCase().trim();
    setFollowing(
      user.following.filter((user) =>
        user.name.toLowerCase().includes(searchTerm)
      )
    );
  };

  useEffect(() => {
    getUser(user.id).then((user) => setFollowing(user.following));
  }, [refresh]);

  return (
    <section>
      <Paper
        variant="outlined"
        sx={{
          marginTop: "1rem",
          maxWidth: "100%",
          marginBottom: "2rem",
          display: "flex",
          padding: "0.5rem",
          justifyContent: "center",
          backgroundColor: "primary.disabled",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search following"
          inputRef={inputRef}
          onChange={handleSearch}
        />
      </Paper>
      <section className={style.section}>
        {following?.map((user) => (
          <Card user={user} key={user.id} />
        ))}
      </section>
    </section>
  );
}
