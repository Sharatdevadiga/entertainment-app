import useSearch from "../hooks/useSearch";
import usePaginatedMediaFetcher from "../hooks/usePaginatedMediaFetcher";
import SearchBar from "../components/general/SearchBar";
import SearchResults from "../components/general/SearchResults";
import PaginatedMedia from "../components/general/PaginatedMedia";

function MoviesPage() {
  const {
    mediaData,
    isLoading,
    isGlobalError,
    isLocalError,
    loadPaginatedData,
  } = usePaginatedMediaFetcher("movie", "movie");

  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearchLoading,
    searchError,
    debouncedSearchQuery,
  } = useSearch("movie");

  if (isGlobalError) return <div>Error loading data</div>;

  return (
    <main className="w-full space-y-12">
      <SearchBar type="movie" onSearch={setSearchQuery} />
      {searchQuery ? (
        <SearchResults
          searchQuery={searchQuery}
          searchResults={searchResults}
          isSearchLoading={isSearchLoading}
          searchError={searchError}
          debouncedSearchQuery={debouncedSearchQuery}
        />
      ) : (
        <PaginatedMedia
          mediaData={mediaData}
          isLoading={isLoading}
          loadPaginatedData={loadPaginatedData}
          isLocalError={isLocalError}
          title="Movies"
        />
      )}
    </main>
  );
}

export default MoviesPage;
