import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./routes/errorPage/ErrorPage";
import Profile from "./routes/profile";
import Callback from "./routes/callback";
import Logout from "./routes/logout";
import Following from "./routes/following";
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
        }
      ]
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    //<React.StrictMode>
    <RouterProvider router={router} />
    //</React.StrictMode>,
)
