export const followUser = async (userId, followerId, action) => {
  try {
    return fetch(`/api/users/${userId}`, {
      method: "PATCH",
      body: JSON.stringify({ action, followerId }),
    }).then((res) => res.json());
  } catch (e) {
    console.error(e);
  }
};

export const followingUser = (followersIds, currentUserId) => {
  return followersIds.some((id) => id === currentUserId);
};
