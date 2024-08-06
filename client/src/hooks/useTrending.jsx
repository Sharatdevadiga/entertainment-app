// import { useEffect, useState } from "react";
// import { fetcher } from "../utils/api";
// import { endpoints } from "../config/config";

// function useTrending() {
//   let [trendingData, setrendingData] = useState();
//   let [isLoading, setIsLoading] = useState(false);
//   let [isError, setIsError] = useState(false);

//   useEffect(() => {
//     const fetchTrending = async function () {
//       try {
//         setIsLoading(true);
//         let data = await fetcher(endpoints.trending);
//         if (data) setrendingData(data?.data || data);
//       } catch (err) {
//         setIsError(true);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchTrending();
//   }, []);

//   return { trendingData, isLoading, isError };
// }

// export default useTrending;
