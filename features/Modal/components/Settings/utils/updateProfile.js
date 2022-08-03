export const updateProfile = async (userId, value, action) => {
  try {
    await fetch(`/api/users/${userId}/settings`, {
      method: "PATCH",
      body: JSON.stringify({ action, userId, value }),
    });
  } catch (e) {
    console.error(e);
  }
};
