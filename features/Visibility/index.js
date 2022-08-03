import React from 'react'
import { changeVisibility } from './utils/updateVisibilityUtils'
import { Tooltip, IconButton } from '@mui/material'
import { VisibilityOffRounded } from '@mui/icons-material'
import { VisibilityRounded } from '@mui/icons-material'

export default function Visibility({ snippet, setSnippet }) {
  const handleVisibility = () => {
    changeVisibility(snippet.id, snippet.public)
      .then(data => {
        setSnippet({ ...snippet, public: data.isPublic })
      })
  }
  return (
    <Tooltip title="Toggle visibility">
      <IconButton
        variant="text"
        onClick={handleVisibility}
      >
        {snippet.public ? <VisibilityRounded /> : <VisibilityOffRounded />}
      </IconButton>
    </Tooltip>
  )
}
