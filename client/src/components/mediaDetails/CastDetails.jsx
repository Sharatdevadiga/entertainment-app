/* eslint-disable react/prop-types */
import { endpoints } from "../../config/config";
import useCustomFetcher from "../../hooks/useCustomFetcher";
import Loader from "../general/Loader";
import BoxName from "./BoxName";

function CastDetails({ type, id }) {
  const mediaCastEndpoint =
    type === "movie"
      ? `${endpoints.movies}${id}/cast`
      : `${endpoints.tvSeries}${id}/cast`;

  const {
    data: mediaCast,
    isLoading: isMediaCastLoading,
    isError: isMediaCastError,
  } = useCustomFetcher(`${mediaCastEndpoint}`);

  if (isMediaCastLoading) return <Loader type="child" size="small"></Loader>;
  if (isMediaCastError) return <div> Error</div>;

  if (mediaCast) {
    return (
      <div className="space-y-3">
        <p>Cast</p>
        <div className="flex flex-wrap gap-3">
          {mediaCast?.map((cast, idx) => (
            <BoxName key={idx} type="unfilled">
              {cast.name}{" "}
            </BoxName>
          ))}
        </div>
      </div>
    );
  }
}

export default CastDetails;
