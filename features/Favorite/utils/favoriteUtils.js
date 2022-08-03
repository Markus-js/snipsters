export const userHasFavouritted = (snippet, userId) => {
  if (!snippet.favouritedByIds) {
    return false;
  }
  return snippet.favouritedByIds.find(id => id === userId) ? true : false
}

export const favoriteSnippet = async (id, userId, favorite) => {
  try {
    return fetch(`/api/snippets/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ action: (favorite ? 'UNFAVORITE' : 'FAVORITE'), userId }),
    })
    .then(res => res.json())
  } catch (e) {
    console.error(e);
  }
} 