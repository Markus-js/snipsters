import React, { useRef } from "react";
import { TextField } from "components/TextField";
import { Box, Button } from "@mui/material";
// UTILS
import { updateProfile } from "../../utils/updateProfile";
// STYLE
import style from "./profile.module.scss";
const inputStyle = {
  width: "100%",
};

export default function Name({ userId }) {
  const nameRef = useRef(null);

  const handleProfileSettings = () => {
    const value = nameRef.current.value;
    updateProfile(userId, value, "NAME");
  };

  return (
    <Box className={style.profile_container}>
      <h2>Change name</h2>
      <section className={style.profile_content}>
        <TextField inputSx={inputStyle} inputRef={nameRef} placeholder="Name" maxLength={10} />
      </section>
      <Button onClick={handleProfileSettings} variant="contained">
        Edit
      </Button>
    </Box>
  );
}
