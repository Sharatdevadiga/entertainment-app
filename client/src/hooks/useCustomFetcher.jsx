import { useEffect, useState } from "react";
import { fetcher } from "../utils/api";

function useCustomFetcher(endpoint) {
  let [data, setData] = useState(null);
  let [isLoading, setIsLoading] = useState(false);
  let [isError, setIsError] = useState(false);
  let [errormessage, setErrormessage] = useState(null);

  function resetError() {
    setIsError(false);
    setErrormessage(null);
  }

  useEffect(() => {
    const fetchTrending = async function () {
      try {
        resetError();
        setIsLoading(true);
        const fetchedData = await fetcher(endpoint);
        if (fetchedData) setData(fetchedData?.data || data);
      } catch (err) {
        setIsError(true);
        setErrormessage(err?.message || err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrending();
  }, [endpoint]);

  return { data, isLoading, isError, errormessage };
}

export default useCustomFetcher;
