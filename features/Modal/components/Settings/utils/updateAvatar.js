export const updateAvatar = async (userId, avatar) => {
  try {
    await fetch(`/api/users/${userId}/settings`, {
      method: "PATCH",
      body: JSON.stringify({ action: "AVATAR", userId, avatar }),
    });
  } catch (e) {
    console.error(e);
  }
};
