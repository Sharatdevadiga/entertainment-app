/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import useCustomFetcher from "../hooks/useCustomFetcher";
import { endpoints, POSTER_BASE_URL } from "../config/config";
import Ratings from "../components/mediaDetails/Ratings";
import MediaFacts from "../components/mediaDetails/MediaFacts";
import CastDetails from "../components/mediaDetails/CastDetails";
import MediaLinks from "../components/mediaDetails/MediaLinks";
import Genres from "../components/mediaDetails/Genres";
import Synopsis from "../components/mediaDetails/Synopsis";

function MediaDetails() {
  const { type, id } = useParams();
  const mediaDetailsEndpoint =
    type === "movie"
      ? `${endpoints.movies}${id}`
      : `${endpoints.tvSeries}${id}`;

  const {
    data: mediaDetails,
    isLoading: ismediaDetailsLoading,
    isError: isMediaDetailsError,
  } = useCustomFetcher(mediaDetailsEndpoint);

  if (ismediaDetailsLoading) return <div>Loading...</div>;
  if (isMediaDetailsError) return <div>Error</div>;

  console.log(mediaDetails);
  if (mediaDetails)
    return (
      <main className="grid grid-cols-1 p-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-12 lg:p-12">
        <section className="md:col-span-1">
          <img
            className="rounded-lg"
            src={`${POSTER_BASE_URL}${mediaDetails.poster_path}`}
            alt=""
          />
        </section>

        <section className="space-y-5 lg:col-span-2">
          <div>
            <h1>{mediaDetails.original_title || mediaDetails.original_name}</h1>
            <Ratings rating={mediaDetails.vote_average}></Ratings>
          </div>
          <MediaFacts data={mediaDetails} type={type} />
          <Genres mediaDetails={mediaDetails} />
          <Synopsis overview={mediaDetails.overview} />

          {/* CastDetails component for large screens */}
          <div className="hidden lg:block">
            <CastDetails id={id} type={type} />
          </div>

          {/* links for small screens */}
          <div className="col-span-1 sm:col-span-2 lg:hidden">
            <MediaLinks data={mediaDetails} />
          </div>

          {/* links for large screens */}
          <div className="hidden lg:block">
            <MediaLinks data={mediaDetails} />
          </div>
        </section>

        {/* CastDetails component for large screens */}
        <section className="col-span-1 sm:col-span-2 lg:hidden">
          <CastDetails id={id} type={type} />
        </section>
      </main>
    );
}

export default MediaDetails;
