/* eslint-disable react/prop-types */

import MediaCard from "../mediaCard/MediaCard";
import ErrorIndicator from "./ErrorIndicator";
import Loader from "./Loader";

// Component for rendering search results
function SearchResults({
  searchQuery,
  searchResults,
  isSearchLoading,
  searchError,
  debouncedSearchQuery,
}) {
  if (isSearchLoading || !debouncedSearchQuery)
    return <Loader type="child" size="small"></Loader>;

  if (searchError) return <ErrorIndicator></ErrorIndicator>;

  return (
    <section className="flex flex-col gap-4">
      <h2>{`Found ${searchResults.length} results for "${searchQuery}"`}</h2>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {searchResults.map((item) => (
          <MediaCard data={item} key={`${item.id}${item.title}`} />
        ))}
      </div>
    </section>
  );
}

export default SearchResults;
