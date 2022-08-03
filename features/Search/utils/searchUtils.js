export const getSnippets = async () => {
  try {
    return fetch(`/api/snippets`)
      .then(res => res.json())
  } catch (e) {
    console.error(e)
  }
};

export const getSearchResults = async (search) => {
  const searchParams = new URLSearchParams(search);
  try {
    return fetch(`/api/snippets/search?${searchParams.toString()}`)
      .then(res => res.json())
  } catch (e) {
    console.error(e)
  }
};

export const getSorter = (a, b, orderBy) => {
  switch (orderBy) {
    case 'title':
      if (a.title.toUpperCase() < b.title.toUpperCase()) {
        return -1;
      }
      if (a.title.toUpperCase() > b.title.toUpperCase()) {
        return 1;
      }
      return 0;
    case 'language':
      if (a.language.toUpperCase() < b.language.toUpperCase()) {
        return -1;
      }
      if (a.language.toUpperCase() > b.language.toUpperCase()) {
        return 1;
      }
      return 0;
    case 'upvotes':
      return a.votesIds.length - b.votesIds.length;
    case 'favorites':
      return a.favouritedByIds.length - b.favouritedByIds.length;
    default:
      return 0;
  }
}
