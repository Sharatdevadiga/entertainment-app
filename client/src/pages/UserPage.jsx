import { NavLink, useNavigate } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { logout } from "../utils/api";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { unmarkAuthenticated } from "../features/auth/authSlice";

function UserPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  async function handleLogout() {
    try {
      const result = await logout();
      if (result?.status === "success") {
        toast.success("Logged out from the application");
        dispatch(unmarkAuthenticated());
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 1000);
      } else {
        toast.error("Logout error! make sure you are logged in first");
      }
    } catch (err) {
      toast.error("Logout error! make sure you are logged in first");
    }
  }

  return (
    <main className="flex w-full p-6 md:h-[100%]">
      <div className="flex h-full w-full flex-col gap-6 rounded-2xl bg-slate-800 bg-opacity-80 p-8 md:w-[50%]">
        {/* Close Button */}
        <button
          onClick={() => navigate(-1)}
          className="self-end text-white transition-all hover:translate-y-[-2px]"
        >
          <IoClose size={24} />
        </button>
        {isAuthenticated ? (
          <>
            <div className="flex w-full flex-col items-center gap-2 border-b-[0.25px] py-2">
              <MdAccountCircle className="text-3xl" />
              {user.email}
            </div>
            <button
              onClick={handleLogout}
              className="border-gray-600 flex w-full items-center gap-2 border-b-[0.25px] py-2"
            >
              <FaSignOutAlt /> Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              className="border-gray-600 flex w-full items-center gap-2 border-b-[0.25px] py-2"
              to="/signup"
            >
              <MdAccountCircle /> SignUp
            </NavLink>

            <NavLink
              className="border-gray-600 flex w-full items-center gap-2 border-b-[0.25px] py-2"
              to="/login"
            >
              <FaSignInAlt /> Login
            </NavLink>
          </>
        )}
      </div>
    </main>
  );
}

export default UserPage;
