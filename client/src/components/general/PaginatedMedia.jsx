/* eslint-disable react/prop-types */
import MediaCard from "../mediaCard/MediaCard";
import Loader from "./Loader";

function PaginatedMedia({
  mediaData,
  isLoading,
  loadPaginatedData,
  isLocalError,
  title,
}) {
  return (
    <section className="flex flex-col gap-4">
      <h2>{title}</h2>
      {isLoading && mediaData.length === 0 ? (
        <Loader type="child" size="small"></Loader>
      ) : (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {mediaData?.map((item) => (
            <MediaCard data={item} key={`${item.id}${item.title}`} />
          ))}
        </div>
      )}
      {!isLoading && mediaData.length > 0 && (
        <div className="flex w-full place-content-center">
          <button
            onClick={loadPaginatedData}
            className="rounded-md bg-primary px-3 py-1"
          >
            See More
          </button>
        </div>
      )}
      {isLocalError && <div>Error loading more data</div>}
    </section>
  );
}

export default PaginatedMedia;
