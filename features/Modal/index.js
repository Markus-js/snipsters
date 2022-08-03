import React, { useState } from "react";
import { useSession } from "next-auth/react";
// COMPONENTS
import { IconButton, Modal, Box } from "@mui/material";
import Settings from "./components/Settings";
// ICONS
import ModeEditIcon from '@mui/icons-material/ModeEdit';

export default function ModalEl({ component, color, style, variant, icon }) {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const boxStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: 500,
    width: 600,
    bgcolor: "background.default",
    boxShadow: 24,
    borderRadius: "0.5rem",
    p: 12,
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    alignContent: "space-between",
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={boxStyle}>
          {component === "SETTINGS" && <Settings userId={userId} />}
          {component === "TEST" && <p>Test</p>}
        </Box>
      </Modal>
      {/* <Button onClick={handleOpen} sx={style} variant={variant}  >
        Open modal
      </Button> */}
        <IconButton

        onClick={handleOpen}
        variant={variant}
      > <ModeEditIcon />
      </IconButton>
    </>
  );
}
