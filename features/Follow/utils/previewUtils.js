export const getSnippetAuthor = async (userId) => {
  return fetch(`/api/users/${userId}/preview`)
    .then(res => res.json())
}
