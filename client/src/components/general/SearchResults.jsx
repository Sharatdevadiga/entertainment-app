/* eslint-disable react/prop-types */

import MediaCard from "../mediaCard/MediaCard";

// Component for rendering search results
function SearchResults({
  searchQuery,
  searchResults,
  isSearchLoading,
  searchError,
  debouncedSearchQuery,
}) {
  if (isSearchLoading) return <div>Loading...</div>;

  if (searchError) return <div>Error in getting search results</div>;

  if (debouncedSearchQuery && SearchResults.length === 0)
    return (
      <h2>{`Found ${searchResults.length} results for "${searchQuery}"`}</h2>
    );

  return (
    <section className="flex flex-col gap-4">
      <h2>{`Found ${searchResults.length} results for "${searchQuery}"`}</h2>
      <div className="grid gap-6 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {searchResults.map((item) => (
          <MediaCard data={item} key={`${item.id}${item.title}`} />
        ))}
      </div>
    </section>
  );
}

export default SearchResults;
