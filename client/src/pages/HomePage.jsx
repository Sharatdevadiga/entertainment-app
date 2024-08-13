import { useEffect } from "react";
import ErrorIndicator from "../components/general/ErrorIndicator";
import Loader from "../components/general/Loader";
import SearchBar from "../components/general/SearchBar";
import SearchResults from "../components/general/SearchResults";
import MediaCard from "../components/mediaCard/MediaCard";
import { endpoints } from "../config/config";
import useCustomFetcher from "../hooks/useCustomFetcher";
import useSearch from "../hooks/useSearch";
import { useDispatch } from "react-redux";
import { fetchBookmarks } from "../features/bookmark/bookmarkSlice";
import { toast } from "react-toastify";

function HomePage() {
  const isAuthenticated = (state) => state.auth.isAuthenticated;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserBookmarks = async () => {
      if (isAuthenticated) {
        try {
          await dispatch(fetchBookmarks()).unwrap();
        } catch (err) {
          return;
        }
      }
    };

    fetchUserBookmarks();
  }, [isAuthenticated]);

  const {
    data: trendingData,
    isLoading: isTrendingDtaLoading,
    isError: isTrendingDataError,
  } = useCustomFetcher(endpoints.trending, "trendingData");

  const {
    data: recommendationsData,
    isLoading: isRecommendationsDataLoading,
    isError: isRecommendationsDataError,
  } = useCustomFetcher(endpoints.recommendations, "recommendationsData");

  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearchLoading,
    searchError,
    debouncedSearchQuery,
  } = useSearch("media");

  if (isTrendingDtaLoading || isRecommendationsDataLoading)
    return <Loader type="child" size="small"></Loader>;
  if (isTrendingDataError || isRecommendationsDataError || searchError)
    return <ErrorIndicator></ErrorIndicator>;

  if (trendingData && recommendationsData)
    return (
      <main className="w-full space-y-12">
        <SearchBar type="media" onSearch={setSearchQuery}></SearchBar>
        {searchQuery ? (
          <SearchResults
            searchQuery={searchQuery}
            searchResults={searchResults}
            isSearchLoading={isSearchLoading}
            searchError={searchError}
            debouncedSearchQuery={debouncedSearchQuery}
          />
        ) : (
          <>
            {/* trending section*/}
            <section className="space-y-4">
              <h2>Trending</h2>
              <div className="flex gap-6 overflow-x-scroll">
                {trendingData?.map((data) => (
                  <MediaCard
                    type="trending"
                    data={data}
                    key={data?.id}
                  ></MediaCard>
                ))}
              </div>
            </section>
            {/* Recommended section */}
            <section className="flex flex-col gap-4">
              <h2>Recommended for you</h2>
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
                {recommendationsData?.map((data) => (
                  <MediaCard data={data} key={data.id} />
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    );
}

export default HomePage;
