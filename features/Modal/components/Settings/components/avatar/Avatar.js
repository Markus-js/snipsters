import React, { useState, useRef } from "react";
// COMPONENTS
import { TextField } from "components/TextField";
import { Box, Button, Avatar } from "@mui/material";
// UTILS
import { updateAvatar } from "../../utils/updateAvatar";
// STYLE
import style from "./avatar.module.scss";
const inputStyle = {
  width: "100%",
};

export default function AvatarCard({ userId }) {
  const [avatar, setAvatar] = useState("");
  const avatarRef = useRef(null);

  const avatars = [
    "https://cdn-icons-png.flaticon.com/512/219/219955.png",
    "https://cdn-icons-png.flaticon.com/512/3135/3135789.png",
    "https://cdn-icons-png.flaticon.com/512/219/219969.png",
    "https://cdn-icons-png.flaticon.com/512/3800/3800457.png",
    "https://cdn-icons-png.flaticon.com/512/3011/3011270.png",
    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  ];

  const handleUpdateAvatar = () => {
    const ownPicture = avatarRef.current.value;

    if (ownPicture.trim() !== "") {
      updateAvatar(userId, ownPicture);
    } else {
      updateAvatar(userId, avatar);
    }
  };

  return (
    <Box>
      <h2>Avatar</h2>
      <TextField
        inputSx={inputStyle}
        inputRef={avatarRef}
        placeholder="https://"
      />
      <section className={style.avatar_container}>
        {avatars.map((avatar) => (
          <div
            onClick={() => setAvatar(avatar)}
            className={style.image_wrapper}
            key={avatar}
          >
            <Avatar src={avatar} alt="avatar" />
          </div>
        ))}
      </section>
      <Button onClick={handleUpdateAvatar} variant="contained">
        Edit
      </Button>
    </Box>
  );
}
