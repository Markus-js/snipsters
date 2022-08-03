export const getUser = async (id) => {
  try {
    return fetch(`/api/users/${id}`)
    .then(res => res.json())
  } catch (e) {
    console.error(e)
  }
};
