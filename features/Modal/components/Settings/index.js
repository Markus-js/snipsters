import React, { useState } from "react";
// COMPONENTS
import { Tab, Tabs, Box } from "@mui/material";
import Name from "./components/name/Name";
import Bio from "./components/bio/Bio";

export default function Settings({ userId }) {
  const [value, setValue] = useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const boxStyle = {
    width: "100%",
  };

  return (
    <>
      <Box sx={boxStyle}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Name" />
          <Tab label="Bio" />
        </Tabs>
      </Box>
      {value === 0 && <Name userId={userId} />}
      {value === 1 && <Bio userId={userId} />}
    </>
  );
}
