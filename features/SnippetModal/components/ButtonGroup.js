import React, { useState, useEffect } from "react"
import { Box } from '@mui/material';
import Upvote from "features/Upvote";
import Favorite from "features/Favorite";
import Delete from "features/Delete";
import Visibility from "features/Visibility";
import CopyButton from "components/CopyButton";

export default function ButtonGroup({ snippet, setSnippet, session }) {
  const [snippetOwner, setSnippetOwner] = useState(snippet.author.id === session?.user.id);
  useEffect(() => {
    setSnippetOwner(snippet.author.id === session?.user.id);
  }, [snippet]);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
      {session ? snippetOwner
        ? <>
          <Delete snippetId={snippet.id} />
          <Visibility snippet={snippet} setSnippet={setSnippet} />
        </>
        : <>
          <Upvote snippet={snippet} setSnippet={setSnippet} session={session} hideNumber />
          <Favorite snippet={snippet} setSnippet={setSnippet} session={session} hideNumber />
        </>
        : null}
      <CopyButton content={snippet.content} />
    </Box>
  )
}