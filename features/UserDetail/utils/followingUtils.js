export const usersNotFolloingBack = (followers, currentUserId) =>
  followers.flatMap((follower) => {
    if (follower.followersIds.some((id) => id === currentUserId)) {
      return [];
    }
    return follower;
  });
