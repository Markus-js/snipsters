export const getUser = async (id) => {
  try {
    return fetch(`/api/users/${id}`)
    .then(res => res.json())
  } catch (e) {
    console.error(e)
  }
};

export const usersNotFolloingBack = (user, currentUserId) => (
  user.followers.flatMap(follower => {
    if (follower.followersIds.some(id => id === currentUserId)) {
      return [];
    }
    return follower;
  })
);
