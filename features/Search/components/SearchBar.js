import React, { useState, useRef } from 'react';
import { Paper, InputBase, IconButton, Divider, Menu, FormControlLabel, Checkbox, Box, ListItemIcon } from '@mui/material';
import { getSearchResults } from '../utils/searchUtils';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import languageList from 'data/languageList.json';

export default function SearchBar({ setSnippets }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [checked, setChecked] = useState(new Array(languageList.length).fill(true));
  const open = Boolean(anchorEl);
  const inputRef = useRef(null);
  
  const handleSearch = e => {
    e.preventDefault();
    const searchParams = {
      query: inputRef.current.value || '',
      language: languageList.flatMap((lang, index) => checked[index] ? lang : []),
    }
    getSearchResults(searchParams)
      .then(result => {
        setSnippets(result);
      });
  }  
  const handleParentCheck = (event) => {
    setChecked([...checked.fill(event.currentTarget.checked)]);
  };
  const handleLanguageCheck = (event, index) => {
    if (checked.every(lang => lang)) {
      setChecked(checked.map((_, i) => i === index ? true : false ));
      return;
    }
    setChecked(checked.map((check, i) => i === index ? event.currentTarget.checked : check ));
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Paper
        component="form"
        onSubmit={handleSearch}
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
        }}
        color='primary.disabled'
        variant='outlined'
      >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Snippets"
            inputProps={{ 'aria-label': 'search snippets' }}
            inputRef={inputRef}
          />
          <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton sx={{ p: '10px' }} aria-label="menu" onClick={handleClick}>
            <MenuIcon />
          </IconButton>
      </Paper>
      <Menu
        anchorEl={anchorEl}
        id="filter-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', padding: '1rem' }}>
          <ListItemIcon>
            Language
          </ListItemIcon>
          <FormControlLabel
            label="Any"
            control={
              <Checkbox
                checked={checked.every(lang => lang)}
                onChange={handleParentCheck}
              />
            }
          />
          {languageList.map((lang, index) => (
              <FormControlLabel
                key={lang}
                label={lang}
                control={<Checkbox checked={checked[index]} onChange={(e) => handleLanguageCheck(e, index)} />}
              />
          ))}
        </Box>
      </Menu>
    </>
  );
}
