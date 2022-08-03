export const totalUpvotes = user => {
  return user.snippets
    .map(snippet => snippet.votesIds.length)
    .reduce((acc, curr) => acc + curr, 0)
};

export const totalFavorites = user => {
  return user.snippets
  .map(snippet => snippet.favouritedByIds.length)
  .reduce((acc, curr) => acc + curr, 0)
}

export const getFeaturedUsers = async () => {
  const users = await fetch('/api/users')
    .then(res => res.json())
  return users
    .sort((a, b) => totalUpvotes(b) - totalUpvotes(a));
}