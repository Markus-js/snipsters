import React from 'react';
import { Box, Paper } from '@mui/material'
import { FormGroup, FormControlLabel, Switch, TextField } from '@mui/material'
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import Button from '@mui/material/Button';
import data from 'data/languageList'
import SelectField from 'components/SelectField';

export default function CreateForm({
  handleCreate,
  isPublic,
  setIsPublic,
  titleRef,
  descRef,
  language,
  setLanguage
}) {
  const handleChange = (e) => {
    setLanguage(e.target.value)
  }
  return (
    <Paper sx={{ height: '100%', maxHeight: '35rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1rem' }} elevation={4} >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h2>Create new snippet</h2>
        <TextField
          inputRef={titleRef}
          label="Title"
          fullWidth
        />
        <SelectField value={language} dataList={data} handleChange={handleChange} />
        <TextField
          inputRef={descRef}
          label="Description"
          multiline
          fullWidth
          rows={4}
        />
        <FormGroup sx={{
          display: 'flex',
          flexDirection: 'row',
        }}>
          <FormControlLabel onChange={() => setIsPublic(!isPublic)} control={<Switch defaultChecked />} />
          {isPublic ? <h4>Public</h4> : <h4>Private</h4>}
        </FormGroup>
      </Box>
      <Button onClick={handleCreate} className="button" variant="outlined" startIcon={<NoteAddIcon />}>
        Publish snippet
      </Button>
    </Paper>
  )
}
