/* eslint-disable react/prop-types */
import YouTube from "react-youtube";

function VideoModal({ data, onClose }) {

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div
      className="bg-gray-900 fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
      onClick={onClose}
    >
      <div className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-lg bg-gray-transparent p-4">
        <button
          onClick={onClose}
          className="absolute right-2 top-2 text-2xl font-bold text-white"
        >
          &times;
        </button>
        <div className="flex h-full max-h-[90vh] w-full items-center justify-center">
          <YouTube videoId={data.key} opts={opts} className="h-full w-full" />
        </div>
      </div>
    </div>
  );
}

export default VideoModal;
