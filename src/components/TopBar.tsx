import { PlusIcon } from "@heroicons/react/24/solid";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useShallow } from "zustand/shallow";

import Button from "./Button";
import { useAuthStore } from "../states";

function TopBar() {
  const navigate = useNavigate();

  const { logout, authStatus, userId } = useAuthStore(
    useShallow((s) => ({
      logout: s.logout,
      authStatus: s.authStatus,
      userId: s.userId,
    })),
  );

  const navigate_login = () => {
    navigate("/login");
  };

  const navigate_register = () => {
    navigate("/register");
  };

  const loggedInButtons = (
    <>
      <Button>
        <Link to="/create-thread" className="flex flex-row space-x-4">
          <PlusIcon className="w-6 h-6" />
          <p>Create thread</p>
        </Link>
      </Button>
      <Button onClick={logout}>Logout</Button>
      <NavLink
        to={`/user/${userId}/threads`}
        className="rounded-full w-9 h-9 bg-red-500"
      ></NavLink>
    </>
  );

  const loggedOutButtons = (
    <>
      <Button onClick={navigate_login}>Login</Button>
      <Button onClick={navigate_register}>Register</Button>
    </>
  );

  return (
    <div className="flex flex-row justify-between bg-white/60 backdrop-blur-sm px-6 py-4 border-b-1 border-gray-300 fixed top-0 right-0 left-0">
      <img src="/threading.svg" />
      <div className="flex flex-row justify-end items-center space-x-6">
        {authStatus === "authenticated" ? loggedInButtons : loggedOutButtons}
      </div>
    </div>
  );
}

export default TopBar;
