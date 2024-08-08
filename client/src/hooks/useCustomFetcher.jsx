import { useEffect, useState } from "react";
import { fetcher } from "../utils/api";

function useCustomFetcher(endpoint, storageKey = null, expiryTime = 36000000) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  function resetError() {
    setIsError(false);
    setErrorMessage(null);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        resetError();
        setIsLoading(true);

        const now = new Date().getTime();

        // Check local storage first
        const storedData = localStorage.getItem(storageKey);
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          if (now - parsedData.timeStamp < expiryTime) {
            setData(parsedData.value);
            setIsLoading(false);
            return;
          } else {
            localStorage.removeItem(storageKey);
          }
        }

        // Fetch data from API if not found in local storage or expired
        const fetchedData = await fetcher(endpoint);
        if (fetchedData) {
          setData(fetchedData?.data || data);
          if (storageKey)
            localStorage.setItem(
              storageKey,
              JSON.stringify({
                value: fetchedData?.data || data,
                timeStamp: now,
              }),
            );
        }
      } catch (err) {
        setIsError(true);
        setErrorMessage(err?.message || err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [endpoint, storageKey, expiryTime]);

  return { data, isLoading, isError, errorMessage };
}

export default useCustomFetcher;

/*
import { useEffect, useState, useRef } from "react";
import { fetcher } from "../utils/api";
import { endpoints } from "../config/config";

function usePaginatedMediaFetcher(
  mediaType = "movie",
  initialPage = 1,
  storageKey = null,
  expiryTime = 36000000,
) {
  const [mediaData, setMediaData] = useState([]);
  const [page, setPage] = useState(initialPage);
  const [isLoading, setIsLoading] = useState(false);
  const [isGlobalError, setIsGlobalError] = useState(false);
  const [isLocalError, setIsLocalError] = useState(false);
  const hasFetchedInitialData = useRef(false);

  const endpoint =
    mediaType === "movie" ? endpoints.movies : endpoints.tvSeries;

  function initialReset() {
    setIsLoading(true);
    setIsLocalError(false);
    setIsGlobalError(false);
  }

  async function fetchData(page) {
    initialReset();

    try {
      const now = new Date().getTime();

      // Check local storage first
      const storedData = localStorage.getItem(`${storageKey}-${page}`);
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

      // is not found in the localStorage, then fetch it and send the data
      const data = await fetcher(`${endpoint}?page=${page}`);
      setMediaData((prevData) => [...prevData, ...data.data]);

      if (storageKey) {
        localStorage.setItem(
          `${storageKey}-${page}`,
          JSON.stringify({
            value: data?.data || data,
            timeStamp: now,
          }),
        );
      }
    } catch (err) {
      if (page === 1) setIsGlobalError(true);
      else setIsLocalError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!hasFetchedInitialData.current) {
      fetchData(page);
      hasFetchedInitialData.current = true;
    }
  }, [page]);

  function loadPaginatedData() {
    setPage((prevPage) => prevPage + 1);
  }

  return {
    mediaData,
    isLoading,
    isGlobalError,
    isLocalError,
    loadPaginatedData,
  };
}

export default usePaginatedMediaFetcher;


*/
