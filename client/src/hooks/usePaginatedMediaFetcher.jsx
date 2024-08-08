import { useEffect, useRef, useState } from "react";
import { fetcher } from "../utils/api";
import { endpoints } from "../config/config";

function usePaginatedMediaFetcher(
  mediaType = "movie",
  storageKey = null,
  expiryTime = 36000000,
) {
  const [mediaData, setMediaData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isGlobalError, setIsGlobalError] = useState(false);
  const [isLocalError, setIsLocalError] = useState(false);
  const hasFetchedInitialData = useRef(false);

  function initialReset() {
    setIsLoading(true);
    setIsLocalError(false);
    setIsGlobalError(false);
  }

  // Function to fetch data
  async function fetchData(pageNumber) {
    initialReset();

    const endpoint =
      mediaType === "movie"
        ? `${endpoints.movies}?page=${pageNumber}`
        : `${endpoints.tvSeries}?page=${pageNumber}`;
    const now = new Date().getTime();

    // Check local storage first
    const storedData = localStorage.getItem(`${storageKey}-${pageNumber}`);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (now - parsedData.timeStamp < expiryTime) {
        setMediaData(parsedData.value);
        setIsLoading(false);
        return;
      } else {
        localStorage.removeItem(storageKey);
      }
    }

    // if not present in the local storage then fetch
    try {
      const data = await fetcher(endpoint);
      setMediaData((prevData) => [...prevData, ...data.data]);

      // store in the local storage
      if (storageKey) {
        localStorage.setItem(
          `${storageKey}-${pageNumber}`,
          JSON.stringify({
            value: data?.data || data,
            timeStamp: now,
          }),
        );
      }
    } catch (err) {
      if (pageNumber === 1) setIsGlobalError(true);
      else setIsLocalError(true);
    } finally {
      setIsLoading(false);
    }
  }

  // Load more data when button is clicked
  function loadPaginatedData() {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchData(nextPage);
  }

  // fetch for the first time, Ref is used to prevent double fetching in dev mode
  useEffect(() => {
    if (!hasFetchedInitialData.current) {
      fetchData(page);
      hasFetchedInitialData.current = true;
    }
  }, []);

  return {
    mediaData,
    isLoading,
    isGlobalError,
    isLocalError,
    loadPaginatedData,
  };
}

export default usePaginatedMediaFetcher;
