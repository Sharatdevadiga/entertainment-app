import MediaCard from "../components/mediaCard/MediaCard";
import { endpoints } from "../config/config";
import useCustomFetcher from "../hooks/useCustomFetcher";

function HomePage() {
  const {
    data: trendingData,
    isLoading: isTrendingDtaLoading,
    isError: isTrendingDataError,
  } = useCustomFetcher(endpoints.trending);

  const {
    data: recommendationsData,
    isLoading: isRecommendationsDataLoading,
    isError: isRecommendationsDataError,
  } = useCustomFetcher(endpoints.recommendations);

  if (isTrendingDtaLoading || isRecommendationsDataLoading)
    return <div>Loading...</div>;
  if (isTrendingDataError || isRecommendationsDataError)
    return <div>Error Loading data</div>;

  return (
    <main className="w-full space-y-12">
      {/* trending section*/}
      <section className="space-y-4">
        <h2>Trending</h2>
        <div className="flex gap-6 overflow-x-scroll">
          {trendingData?.map((data) => (
            <MediaCard type="trending" data={data} key={data?.id}></MediaCard>
          ))}
        </div>
      </section>
      {/* Recommended section */}
      <section className="flex flex-col gap-4">
        <h2>Recommended for you</h2>
        <div className="grid gap-6 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {recommendationsData?.map((data) => (
            <MediaCard data={data} key={data.id} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default HomePage;
