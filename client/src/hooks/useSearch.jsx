import { useEffect, useState } from "react";
import useDebouncer from "./useDebouncer";
import { endpoints } from "../config/config";
import { fetcher } from "../utils/api";

function useSearch(type = "movie", initialQuery = "") {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(false);

  const debouncedSearchQuery = useDebouncer(searchQuery);

  function initialReset() {
    setIsSearchLoading(false);
    setSearchError(false);
  }

  async function fetchData(query) {
    initialReset();

    let endpoint = endpoints.search;
    if (type === "movie") endpoint += "movie";
    if (type === "tv") endpoint += "tvSeries";
    const encodedQuery = encodeURIComponent(query);
    endpoint += `?query=${encodedQuery}`;

    try {
      setIsSearchLoading(true);
      const data = await fetcher(endpoint);
      console.log(data.data);

      //   setSearchResults([...data.data.movie]);
      setSearchResults(data.data);
    } catch (err) {
      setSearchError("Failed to fetch the search results");
    } finally {
      setIsSearchLoading(false);
    }
  }

  useEffect(() => {
    if (debouncedSearchQuery) {
      fetchData(debouncedSearchQuery);
    }
  }, [debouncedSearchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearchLoading,
    searchError,
    debouncedSearchQuery,
  };
}

export default useSearch;
