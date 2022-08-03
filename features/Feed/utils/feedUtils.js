export const getActionData = action => {
  switch (action.type) {
    case 'CREATE_SNIPPET':
      return { text: 'created a new snippet', target: 'snippet' };
    case 'VOTE_SNIPPET':
      return { text: 'voted for snippet', target: 'snippet' };
    case 'FAVOURITE_SNIPPET':
      return { text: 'favorited snippet', target: 'snippet' };
    case 'REFACTOR_SNIPPET':
      return { text: 'refactored snippet', target: 'snippet' };
    case 'COMMENTED_SNIPPET':
      return { text: 'commented on snippet', target: 'snippet' };
    case 'LIKED_COMMENT':
      return { text: 'liked comment', target: 'comment' };
    case 'REPLIED_COMMENT':
      return { text: 'replied to comment', target: 'comment' };
    case 'FOLLOW_USER':
      return { text: 'followed user', target: 'user' };
    default:
      return null
  }
}
