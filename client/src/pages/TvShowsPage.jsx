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
  } = usePaginatedMediaFetcher("tv", "tvSeries");

  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearchLoading,
    searchError,
    debouncedSearchQuery,
  } = useSearch("tv");

  if (isGlobalError) return <div>Error loading data</div>;

  return (
    <main className="w-full space-y-12">
      <SearchBar type="tv" onSearch={setSearchQuery} />
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
          title="Tv Series"
        />
      )}
    </main>
  );
}

export default MoviesPage;
