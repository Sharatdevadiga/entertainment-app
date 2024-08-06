/* eslint-disable react/prop-types */
import { FaLink } from "react-icons/fa6";
import { FaImdb } from "react-icons/fa";
import { IMDB_BASE_URL } from "../../config/config";
import LinkButton from "./LinkButton";

function MediaLinks({ data }) {
  return (
    <div className="flex gap-3">
      {data?.homepage ? (
        <LinkButton link={data.homepage}>
          Website <FaLink />
        </LinkButton>
      ) : (
        ""
      )}
      {data?.imdb_id ? (
        <LinkButton link={`${IMDB_BASE_URL}${data.imdb_id}`}>
          IMDB <FaImdb />
        </LinkButton>
      ) : (
        ""
      )}
    </div>
  );
}

export default MediaLinks;
