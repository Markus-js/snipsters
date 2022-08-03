import React, { useState, useRef } from "react";
import style from "./followersDetails.module.scss";

// COMPONENTS
import Card from "components/Card";
import { Paper, InputBase } from "@mui/material";

export default function FollowersDetails({ user }) {
  const [followers, setFollowers] = useState(user.followers);
  const inputRef = useRef(null);

  const handleSearch = () => {
    const searchTerm = inputRef.current.value.toLowerCase().trim();
    setFollowers(
      user.followers.filter((user) =>
        user.name.toLowerCase().includes(searchTerm)
      )
    );
  };

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
          placeholder="Search followers"
          inputRef={inputRef}
          onChange={handleSearch}
        />
      </Paper>
      <section className={style.section}>
        {followers?.map((user) => (
          <Card user={user} key={user.id} />
        ))}
      </section>
    </section>
  );
}
