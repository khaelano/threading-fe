import { Outlet } from "react-router-dom";
import { useAuthStore } from "../states";
import ErrorPage from "../pages/Error";

function RestrictedRoute() {
  const authStatus = useAuthStore((state) => state.authStatus);
  if (authStatus !== "authenticated") {
    return (
      <ErrorPage
        code={401}
        title="Unauthorized"
        message="You don't have permission to access this page"
      />
    );
    // return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

export default RestrictedRoute;
