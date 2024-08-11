/* eslint-disable react/prop-types */
import { BiSolidMessageAltError } from "react-icons/bi";
import { FaArrowLeft } from "react-icons/fa";
import { FaRotateRight } from "react-icons/fa6";
import { FaSignInAlt } from "react-icons/fa";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

function ErrorIndicator({
  errorMessage = "Something went wrong!",
  action = "reload",
}) {
  const navigate = useNavigate();

  function handleGoBack() {
    navigate(-1);
  }

  function handleReload() {
    window.location.reload();
  }

  return (
    <div className="flex h-full w-full items-center justify-center rounded-2xl bg-opacity-30">
      <div className="flex flex-col items-center justify-center gap-4 rounded-xl bg-red-500 bg-opacity-15 p-6 backdrop-blur-lg xs:p-8">
        <div className="text-6xl text-primary">
          <BiSolidMessageAltError />
        </div>
        <p className="text-body-m">{errorMessage}</p>
        <div className="flex gap-3">
          <Button onClick={handleGoBack}>
            <FaArrowLeft />
            Go Back
          </Button>
          {action === "reload" && (
            <Button onClick={handleReload}>
              Reload <FaRotateRight />
            </Button>
          )}
          {action === "login" && (
            <Button onClick={() => navigate("/login")}>
              Login <FaSignInAlt />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ErrorIndicator;
