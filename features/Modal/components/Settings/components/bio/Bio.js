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

export default function Bio({ userId }) {
  const bioRef = useRef(null);

  const handleProfileSettings = () => { 
    const value = bioRef.current.value;
    updateProfile(userId, value, "BIO");
  };

  return (
    <Box className={style.profile_container}>
      <h2>Change bio</h2>
      <section className={style.profile_content}>
        <TextField  inputSx={inputStyle} inputRef={bioRef} maxLength={20}
 placeholder="Bio" />
      </section>
      <Button onClick={handleProfileSettings} variant="contained">
        Edit
      </Button>
    </Box>
  );
}
