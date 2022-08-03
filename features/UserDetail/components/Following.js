import React, { useState } from "react";
import { ExpandMore } from '@mui/icons-material';
import { Box, Collapse, Typography, Avatar } from "@mui/material";
import Link from "next/link";
import { ExpandMoreButton } from "components/ExpandMoreButton";

// STYLE

export default function Following({ user }) {
  const [expanded, setExpanded] = useState(true);
  const handleExpand = () => {
    setExpanded(!expanded);
  }
  return (
    <Box>
      <Box bgcolor='primary.main' sx={{ display: 'flex', justifyContent: 'space-between', borderRadius: expanded ? '0.5rem 0.5rem 0 0' : '0.5rem', padding: '1rem'}} >
        <Typography component='div' variant='h5'>
          Following
        </Typography>
        <ExpandMoreButton
          onClick={handleExpand}
          expand={expanded}
        >
          <ExpandMore />
        </ExpandMoreButton>
      </Box>
      <Collapse in={expanded} timeout="auto" unmountOnExit sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', overflowY: 'auto', borderRadius: '0 0 0.5rem 0.5rem' }}>
        <Box bgcolor='background.paper' sx={{ maxHeight: '20rem', padding: '1rem', overflowY: 'auto', borderRadius: '0 0 0.5rem 0.5rem' }}>
          {user.following.map(user => (
            <Link href={`/users/${user.id}`} key={user.id}>
              <Box sx={{ display: "flex", gap: "1rem", marginTop: "1rem", alignItems: "center"  }}>
                <Avatar sx={{ width: 42, height: 42 }} src={user.image} />
                <Typography
                  component="a"
                  href={`/users/${user.id}`}
                  variant="h5"
                  color="secondary"
                >
                  {user.name}
                </Typography>
              </Box>
            </Link>
          ))}
        </Box>
      </Collapse>
    </Box>
  );
}
