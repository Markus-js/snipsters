import React from "react";
import CodeMirror from "components/CodeMirror";
import { Paper, Box, Typography } from "@mui/material";
import CreatedBy from "features/SnippetModal/components/CreatedBy";

export default function CodePreview({ previewSnippet }) {
  return (
    <Paper sx={{ height: '100%', width: '40vw', display: 'flex', flexDirection: 'column' }} elevation={4}>
        {previewSnippet && <Box sx={{ padding: '1rem', display: 'flex', justifyContent: 'space-between' }}>
          <CreatedBy snippet={previewSnippet} />
          <Typography component='div' variant='p'>{new Date(previewSnippet?.createdAt).toLocaleString('en-GB')}</Typography>
        </Box>}
      <Box sx={{ height: '100%', width: '100%', overflow: 'hidden' }}>
        <CodeMirror
          code={previewSnippet?.content}
          language={previewSnippet?.language}
          editable={false}
        />
      </Box>
    </Paper>
  );
}
