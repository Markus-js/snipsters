import React, { useState, useEffect } from "react";
import { ArrowDropUp, ArrowDropDown } from "@mui/icons-material";
import Link from "next/link";
// COMPONENTS
import Follow from 'features/Follow';
import MightKnowCard from "./mightKnowCard";
// UTILS
import { usersNotFolloingBack } from "../utils/followingUtils";
// STYLE
import style from "./mightknow.module.scss";
import { Box, Avatar, Typography, Divider } from "@mui/material";
// IMAGE
const backgroundImage =
  "https://www.redditstatic.com/desktop2x/img/leaderboard/banner-background.png";

export default function Following({ user }) {
  const [toggleCard, setToggleCard] = useState(true);
  const [following, setFollowing] = useState(user.following);


  const handleSearch = () => {
    const searchTerm = inputRef.current.value.trim();
    setFollowing(
      user.following.filter((user) => user.name.includes(searchTerm))
    );
  };

  useEffect(() => {
    setFollowing(usersNotFolloingBack(user.followers, user.id));
  }, [user]);

  useEffect(() => {
    // Hide card if screen width is less than 768px
    if (global.screen.width < 768) {
      setToggleCard(false);
    }
  }, []);

  return (
    following.length > 0 && (
      <section className={style.card}>
        <header
          className={style.card__header}
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        >
          <h3 className={style.card__title}>People you may know</h3>
          <span onClick={() => setToggleCard(!toggleCard)}>
            {toggleCard ? (
              <ArrowDropUp className={style.icon} />
            ) : (
              <ArrowDropDown className={style.icon} />
            )}
          </span>
        </header>
        <div className={toggleCard ? style.visiable : style.hidden}>
          <Divider sx={{ marginTop: "2rem", border: "none" }} />
          {following?.map((friend, idx) => {
            // Show only first 3
            if (idx === 3) {
              return;
            }
            return (
             <MightKnowCard  key={friend.id} user={user} friend={friend} />
            );
          })}
        </div>
      </section>
    )
  );
}
