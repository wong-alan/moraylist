//import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import App from './App.tsx'
import Root from "./routes/root";
import Profile from "./routes/profile";
import Callback from "./routes/callback";
import ErrorPage from "./errorPage/ErrorPage";
import './index.css'

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "profile",
          element: <Profile />
        },
        {
          path: "callback",
          element: <Callback />
        }
      ]
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    //<React.StrictMode>
    // <App />
    <RouterProvider router={router} />
    //</React.StrictMode>,
)