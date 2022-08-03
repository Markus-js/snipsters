import React, { useState, useEffect } from "react";
import { ExpandMoreButton } from "components/ExpandMoreButton";
import { ExpandMore } from "@mui/icons-material";
import { Box, Collapse, Typography } from "@mui/material";
import Feed from "features/Feed";

export default function Activities({user}) {
  const [expanded, setExpanded] = useState(true);
  const handleExpand = () => {
    setExpanded(!expanded);
  }
  return (
    <Box sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', overflowY: 'hidden' }} >
      <Box bgcolor='primary.main' sx={{ display: 'flex', justifyContent: 'space-between', borderRadius: expanded ? '0.5rem 0.5rem 0 0' : '0.5rem', padding: '1rem'}} >
        <Typography component='div' variant='h5'>
          Activity
        </Typography>
        <ExpandMoreButton
          onClick={handleExpand}
          expand={expanded}
        >
          <ExpandMore />
        </ExpandMoreButton>
      </Box>
      <Collapse in={expanded} timeout="auto" unmountOnExit sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', overflowY: 'auto', borderRadius: '0 0 0.5rem 0.5rem' }}>
        <Box bgcolor='background.paper' sx={{ display: 'flex', flexDirection: 'column', padding: '1rem' }}>
          <Feed user={user} />
        </Box>
      </Collapse>
    </Box>
  );
}
