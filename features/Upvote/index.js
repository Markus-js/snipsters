import React, {useState} from 'react'
import { voteSnippet, userHasvoted } from './utils/voteUtils'
import { IconButton, Badge, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

export default function Upvote({ snippet, setSnippet, session, hideNumber }) {
  const [voted, setVoted] = useState(userHasvoted(snippet, session.user.id));
  const [disbaled, setDisabled] = useState(false);
  const [buttonDisplay, setButtonDisplay] = useState(userHasvoted(snippet, session.user.id));
  const [votes, setVotes] = useState(snippet.votesIds.length);
  const handleVote = () => {
    if (session && !disbaled) {
      setButtonDisplay(!buttonDisplay);
      setDisabled(true);
      voteSnippet(snippet.id, session.user.id, voted)
        .then(votedSnippet => {
          setVotes(votedSnippet.votesIds.length);
          setVoted(!voted);
          setSnippet(votedSnippet)
          setDisabled(false);
        });
    }
  };
  const StyledBadge = styled(Badge)(() => ({
    '& .MuiBadge-badge': {
      right: 12,
      top: 30,
      padding: '0 4px',
    },
  }));
  return (
    <Tooltip title="Vote for snippet">
      <IconButton
        onClick={handleVote}
        >
        {hideNumber
          ? buttonDisplay ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />
          : (
            <StyledBadge badgeContent={votes}>
              {buttonDisplay ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
            </StyledBadge>
          )
        }
      </IconButton>
    </Tooltip>
  )
}
