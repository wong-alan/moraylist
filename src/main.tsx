import React from 'react';
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, useLocation } from "react-router-dom";
import AppContextProvider from './contexts/AppContext';
import FollowPageContextProvider from './contexts/FollowPageContext';
import Root from "./routes/Root";
import ProtectedRoot from "./routes/ProtectedRoot";
import ErrorPage from "./routes/ErrorPage/ErrorPage";
import Landing from "./routes/Landing/Landing";
import Profile from "./routes/Profile";
import Callback from "./routes/Callback";
import Logout from "./routes/Logout";
import Following from "./routes/Following";
import Shuffle from "./routes/Shuffle";
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
    // Public
    {
        element: <Root />,
        errorElement: <><Root /><ErrorPage /></>,
        children: [{
            path: "/",
            element: <Landing />
        }, {
            path: "callback",
            element: <Callback />
        }, {
            path: "logout",
            element: <Logout />
        }]
    },
    // Protected
    {
        element: <ProtectedRoot />,
        errorElement: <><Root /><ErrorPage /></>,
        children: [{
            path: "profile",
            element: <Profile />
        }, {
            path: "following",
            element:
                <FollowPageContextProvider>
                    <Following />
                </FollowPageContextProvider>
        }, {
            path: "shuffle",
            element: <Shuffle />
        }]
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AppContextProvider>
            <RouterProvider router={router} />
        </AppContextProvider>
    </React.StrictMode>
)
