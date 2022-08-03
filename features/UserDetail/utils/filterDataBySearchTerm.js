export const filterDataBySearchTerm = (searchTermForSnippetTitle, snippets) => {
  return snippets.filter(item => {
    return item.title.toLowerCase().includes(searchTermForSnippetTitle.trim().toLowerCase());
  });
}