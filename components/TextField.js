import React from "react";
import { Paper, InputBase } from "@mui/material";

export function TextField({
  sx,
  inputSx,
  multiline,
  placeholder,
  onChange,
  inputRef,
  className,
  inputClassName,
}) {
  return (
    <Paper onChange={onChange} sx={sx}>
      <InputBase
        color={"white"}
        multiline={multiline}
        sx={inputSx}
        placeholder={placeholder}
        inputRef={inputRef}
      />
    </Paper>
  );
}
