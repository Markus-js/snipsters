export const userHasvoted = (snippet, userId) => {
  if (!snippet.votesIds) {
    return false;
  }
  return snippet.votesIds.find((id) => id === userId) ? true : false;
};

export const voteSnippet = async (id, userId, voted) => {
  try {
    return fetch(`/api/snippets/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ action: voted ? "UNVOTE" : "VOTE", userId }),
    }).then((res) => res.json());
  } catch (e) {
    console.error(e);
  }
};
