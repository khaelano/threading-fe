import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home, { homeLoader } from "./pages/Home";
import CreateThread from "./pages/CreateThread";
import ModifyThread, { modifyThreadLoader } from "./pages/ModifyThread";
import UserThread, { userThreadLoader } from "./pages/UserThread";
import RestrictedRoute from "./components/RestrictedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: homeLoader,
  },
  {
    path: "/user/:userId/threads",
    element: <UserThread />,
    loader: userThreadLoader,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    element: <RestrictedRoute />,
    children: [
      {
        path: "/create-thread",
        element: <CreateThread />,
      },
      {
        path: "/modify-thread/:threadId",
        element: <ModifyThread />,
        loader: modifyThreadLoader,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
