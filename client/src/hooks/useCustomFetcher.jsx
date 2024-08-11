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
