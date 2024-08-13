
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
