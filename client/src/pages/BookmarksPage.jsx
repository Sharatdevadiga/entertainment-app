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

// import { useDispatch } from "react-redux";
// import { useDispatch, useSelector } from "react-redux";
// import ErrorIndicator from "../components/general/ErrorIndicator";
// import Loader from "../components/general/Loader";
// import MediaCard from "../components/mediaCard/MediaCard";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import { fetchBookmarks } from "../components/bookmark/bookmarkSlice";
// import { toast } from "react-toastify";

// function BookmarksPage() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const {
//     data: bookmarks,
//     isLoading,
//     isError,
//     error,
//   } = useSelector((state) => state.bookmarks);

//   useEffect(() => {
//     const fetchBookmarksData = async () => {
//       try {
//         await dispatch(fetchBookmarks()).unwrap();
//       } catch (err) {
//         console.log(err);
//         if (err == "Unauthorized") {
//           toast.error("Login to see your bookmarks");
//           navigate("/login");
//           return;
//         } else {
//           toast.error("Failed to fetch bookmarks");
//         }
//       }
//     };

//     fetchBookmarksData();
//   }, []);

//   if (isLoading) return <Loader />;
//   if (isError) return <ErrorIndicator />;
//   if (bookmarks) {
//     // dispatch(setBookmarks(bookmarks));

//     return (
//       <section className="flex w-full flex-col gap-4">
//         <h2>bookmarks</h2>
//         <div className="grid w-full grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
//           {bookmarks.length ? (
//             bookmarks.map((data) => <MediaCard data={data} key={data.id} />)
//           ) : (
//             <p>Add some bookmarks to view them on this page</p>
//           )}
//         </div>
//       </section>
//     );
//   }
// }

// export default BookmarksPage;
