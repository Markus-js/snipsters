import React, { useState } from 'react';
import { favoriteSnippet, userHasFavouritted } from './utils/favoriteUtils';
import { IconButton, Badge, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function Favorite({ snippet, setSnippet, session, hideNumber }) {
  const [favorited, setFavorited] = useState(userHasFavouritted(snippet, session.user.id));
  const [buttonDisplay, setButtonDisplay] = useState(userHasFavouritted(snippet, session.user.id))
  const [disbaled, setDisabled] = useState(false);
  const [favorites, setFavorites] = useState(snippet.favouritedByIds.length);
  const handleFavorite = () => {
    if (session && !disbaled) {
      setButtonDisplay(!buttonDisplay);
      setDisabled(true);
      favoriteSnippet(snippet.id, session.user.id, favorited)
        .then(favoritedSnippet => {
          setFavorites(favoritedSnippet.favouritedByIds.length)
          setFavorited(!favorited)
          setSnippet(favoritedSnippet);
          setDisabled(false);
        });
    }
  };
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: 12,
      top: 30,
      padding: '0 4px',
    },
  }));
  return (
    <Tooltip title="Add to favorites">
      <IconButton
        variant="text"
        onClick={handleFavorite}
        >
        {hideNumber
          ? favorited ? <FavoriteIcon /> : <FavoriteBorderIcon />
          : (
            <StyledBadge badgeContent={favorites}>
              {favorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </StyledBadge>
          )
        }
      </IconButton>
    </Tooltip>
  )
}
