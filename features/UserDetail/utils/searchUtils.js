export const getSearchResults = async (userId) => {
  try {
    return fetch(`/api/snippets/`)
    .then(res => res.json())
  } catch (e) {
    console.error(e)
  }
};
