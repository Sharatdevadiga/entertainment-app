// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { getBookMarks } from "../utils/api";
// import { endpoints } from "../config/config";
// import { useDispatch } from "react-redux";

// function useGetBookmarks() {
//   const [bookmarks, setBookmarks] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isError, setIsError] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   async function fetchBookmarks() {
//     try {
//       setIsLoading(true);
//       setIsError(false);

//       const result = await getBookMarks(endpoints.bookmark);
//       if (result?.status === 401) {
//         toast.error("Login to see your bookmarks");
//         navigate("/login");
//         return;
//       }

//       setBookmarks(result?.data || []);
//       console.log(result.data);

//       console.log(result);
//     } catch (err) {
//       console.log(err);
//       setIsError(true);
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   useEffect(() => {
//     fetchBookmarks();
//   }, []);

//   return { bookmarks, isLoading, isError };
// }

// export default useGetBookmarks;

// src/hooks/useGetBookmarks.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookmarks } from "../features/bookmark/bookmarkSlice";

function useGetBookmarks() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: bookmarks,
    isLoading,
    isError,
    error,
  } = useSelector((state) => state.bookmarks);

  useEffect(() => {
    const fetchBookmarksData = async () => {
      try {
        await dispatch(fetchBookmarks()).unwrap();
      } catch (err) {
        console.log(err);
        if (err == "Unauthorized") {
          toast.error("Login to see your bookmarks");
          navigate("/login");
          return;
        } else {
          toast.error("Failed to fetch bookmarks");
        }
      }
    };

    fetchBookmarksData();
  }, []);

  return { bookmarks, isLoading, isError, error };
}

export default useGetBookmarks;
