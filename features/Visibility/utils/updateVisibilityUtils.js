export const changeVisibility = async (id, isPublic) => {
  try {
    return fetch(`/api/snippets/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ action: isPublic ? 'PRIVATE' : 'PUBLIC'})
    })
    .then(res => res.json());
  } catch (e) {
    console.error(e);
  }
};
