import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, useLocation } from "react-router-dom";
import AppContextProvider from './contexts/AppContext';
import FollowPageContextProvider from './contexts/FollowPageContext';
import ShufflePageContextProvider from './contexts/ShufflePageContext';
import Root from "./routes/Root";
import ProtectedRoot from "./routes/ProtectedRoot";
import './index.css'

const ErrorPage = lazy(() => import("./routes/ErrorPage/ErrorPage"));
const Landing = lazy(() => import("./routes/Landing/Landing"));
const Profile = lazy(() => import("./routes/Profile"));
const Callback = lazy(() => import("./routes/Callback"));
const Logout = lazy(() => import("./routes/Logout"));
const Following = lazy(() => import("./routes/Following/Following"));
const Shuffle = lazy(() => import("./routes/Shuffle"));

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
        element:
            <Suspense>
                <Root />
            </Suspense>,
        errorElement:
            <Suspense>
                <Root />
                <ErrorPage />
            </Suspense>,
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
        element:
            <Suspense>
                <ProtectedRoot />
            </Suspense>,
        errorElement:
            <Suspense>
                <Root />
                <ErrorPage />
            </Suspense>,
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
            element:
                <ShufflePageContextProvider>
                    <Shuffle />
                </ShufflePageContextProvider>
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
