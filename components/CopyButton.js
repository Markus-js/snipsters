import React from "react";
import { IconButton, Snackbar, Alert, Tooltip } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function CopyButton({ content }) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(content);
    setOpen(true);
  }

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Copy snippet">
        <IconButton onClick={handleClick}>
          <ContentCopyIcon />
        </IconButton>
      </Tooltip>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
          Snippet copied to clipboard!
        </Alert>
      </Snackbar>
    </>
  );
}
