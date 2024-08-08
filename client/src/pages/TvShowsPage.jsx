import SearchBar from "../components/general/SearchBar";
import MediaCard from "../components/mediaCard/MediaCard";
import usePaginatedMediaFetcher from "../hooks/usePaginatedMediaFetcher";

function MoviesPage() {
  const {
    mediaData,
    isLoading,
    isGlobalError,
    isLocalError,
    loadPaginatedData,
  } = usePaginatedMediaFetcher("tv", "tvSeries");

  if (isGlobalError) return <div>Error Loading data</div>;

  return (
    <main className="w-full space-y-12">
      <SearchBar type="tv"></SearchBar>
      <section className="flex flex-col gap-4">
        <h2>Tv shows</h2>
        {isLoading && mediaData.length === 0 ? (
          <div>Loading...</div>
        ) : (
          <div className="grid gap-6 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {mediaData.map((item) => (
              <MediaCard data={item} key={`${item.id}${item.title}`} />
            ))}
          </div>
        )}
        {!isLoading && mediaData.length > 0 && (
          <div className="flex w-full place-content-center">
            <button
              onClick={loadPaginatedData}
              className="bg-primary px-3 py-1"
            >
              See More
            </button>
          </div>
        )}
        {isLocalError && <div>Error Loading more data</div>}
      </section>
    </main>
  );
}

export default MoviesPage;
