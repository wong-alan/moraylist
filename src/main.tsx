import React from 'react';
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./routes/errorPage/ErrorPage";
import Landing from "./routes/landing/landing";
import Profile from "./routes/profile";
import Callback from "./routes/callback";
import Logout from "./routes/logout";
import Following from "./routes/following";
import Shuffle from "./routes/shuffle";
import './index.css'

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: (
        <>
          <Root />
          <ErrorPage />
        </>
      ),
      children: [
        {
          index: true,
          element: <Landing />
        },
        {
          path: "profile",
          element: <Profile />
        }, {
          path: "callback",
          element: <Callback />
        }, {
          path: "logout",
          element: <Logout />
        }, {
          path: "following",
          element: <Following />
        }, {
          path: "shuffle",
          element: <Shuffle />
        },
      ]
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
)
