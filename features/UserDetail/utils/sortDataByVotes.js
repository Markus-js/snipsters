export const sortDataByVotes = (snippets, highestVotes) => {
  return snippets.sort((a, b) => {
    if (highestVotes) {
      return b.votesIds.length - a.votesIds.length;
    } else {
      return a.votesIds.length - b.votesIds.length;
    }
  });
}