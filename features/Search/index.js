import React, { useState, useEffect, useRef } from 'react';
import { getSnippets, getSearchResults } from './utils/searchUtils';
import SearchResults from './components/SearchResults';
import SearchBar from './components/SearchBar';
import style from './search.module.scss'

export default function Search() {
  const [snippets, setSnippets] = useState(null);
  const [previewSnippet, setPreviewSnippet] = useState(null);
  const inputRef = useRef(null);
  const handleSearch = e => {
    e.preventDefault();
    const searchParams = {
      query: inputRef.current.value || '',
      language: languageList.flatMap((lang, index) => checked[index] ? lang : []),
    }
    getSearchResults(searchParams)
      .then(result => {
        setSnippets(result);
      });
  }  
  useEffect(() => {
    getSnippets()
      .then(data => {
        setSnippets(data);
      });
  }, []);
  return (
    <section className={style.search}>
      <SearchBar setSnippets={setSnippets} inputRef={inputRef} handleSearch={handleSearch} />
      <SearchResults snippets={snippets} setSnippets={setSnippets} previewSnippet={previewSnippet} setPreviewSnippet={setPreviewSnippet} />
    </section>
  );
}
