// import { useDispatch } from "react-redux";
import ErrorIndicator from "../components/general/ErrorIndicator";
import Loader from "../components/general/Loader";
import MediaCard from "../components/mediaCard/MediaCard";
import useGetBookmarks from "../hooks/useGetBookmarks";

function BookmarksPage() {
  const { bookmarks, isLoading, isError } = useGetBookmarks();

  // const dispatch = useDispatch();

  if (isLoading) return <Loader />;
  if (isError) return <ErrorIndicator />;
  if (bookmarks) {
    // dispatch(setBookmarks(bookmarks));

    return (
      <section className="flex w-full flex-col gap-4">
        <h2>Bookmarks</h2>
        <div className="grid w-full grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {bookmarks.length ? (
            bookmarks.map((data) => <MediaCard data={data} key={data.id} />)
          ) : (
            <p className="text-body-s">No bookmarks found</p>
          )}
        </div>
      </section>
    );
  }
}

export default BookmarksPage;
