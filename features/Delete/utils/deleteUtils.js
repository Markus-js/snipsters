export const deleteSnippet = async (id, userId) => {
  try {
    return fetch(`/api/snippets/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ action: 'DELETE' })
    })
    .then(res => res.json())
  } catch (e) {
    console.error(e);
  }
};
