import React from 'react';
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, useLocation } from "react-router-dom";
import AppContextProvider from './contexts/AppContext';
import Root from "./routes/root";
import ErrorPage from "./routes/errorPage/ErrorPage";
import Landing from "./routes/landing/landing";
import Profile from "./routes/profile";
import Callback from "./routes/callback";
import Logout from "./routes/logout";
import Following from "./routes/following";
import Shuffle from "./routes/shuffle";
import './index.css'

const titleMap: Record<string, string> = {
    "/": "A Spotify Toolbox",
    "/profile": "Your Profile",
    "/following": "Your Followed Artists",
    "/shuffle": "Shuffle Playlists",
};

export const usePageTitle = () => {
    const location = useLocation().pathname;
    document.title = `${titleMap[location] ?? 'A Spotify Toolbox'} | Splotchify`
}

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Root />
        ),
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
            }, {
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
        <AppContextProvider>
            <RouterProvider router={router} />
        </AppContextProvider>
    </React.StrictMode>
)
