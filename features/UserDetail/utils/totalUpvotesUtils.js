export const totalUpvotes = async (userId) => {
  try {
    return fetch(`/api/users/snippets/${userId}`)
    .then(res => res.json())
  } catch (e) {
    console.error(e)
  }
};

export const getTotalUpvotes = (user) => {
  return user.snippets
    .map(snippet => snippet.public ? snippet.votesIds.length : 0)
    .reduce((acc, curr) => acc + curr, 0)
};