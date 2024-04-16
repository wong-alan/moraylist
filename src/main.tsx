import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppContextProvider from './contexts/AppContext';
import Root from "./routes/Root";
import ProtectedRoot from "./routes/ProtectedRoot";
import './index.css'

const FollowPageContextProvider = lazy(() => import ("./contexts/FollowPageContext"));
const ShufflePageContextProvider = lazy(() => import ("./contexts/ShufflePageContext"));

const ErrorPage = lazy(() => import("./routes/ErrorPage/ErrorPage"));
const Landing = lazy(() => import("./routes/Landing/Landing"));
const Profile = lazy(() => import("./routes/Profile"));
const Callback = lazy(() => import("./routes/Callback"));
const Logout = lazy(() => import("./routes/Logout"));
const Following = lazy(() => import("./routes/Following"));
const Shuffle = lazy(() => import("./routes/Shuffle"));
const Recent = lazy(() => import("./routes/Recent"));

const router = createBrowserRouter([
    { // Public
        element: <Root />,
        errorElement:
            <>
                <Root />
                <Suspense>
                    <ErrorPage />
                </Suspense>
            </>,
        children: [{
            path: "/",
            element: <Suspense><Landing /></Suspense>
        }, {
            path: "callback",
            element: <Suspense><Callback /></Suspense>
        }, {
            path: "logout",
            element: <Suspense><Logout /></Suspense>
        }]
    }, { // Protected
        element: <ProtectedRoot />,
        errorElement:
            <>
                <Root />
                <Suspense>
                    <ErrorPage />
                </Suspense>
            </>,
        children: [{
            path: "profile",
            element: <Suspense><Profile /></Suspense>
        }, {
            path: "following",
            element:
                <Suspense>
                    <FollowPageContextProvider>
                        <Following />
                    </FollowPageContextProvider>
                </Suspense>
        }, {
            path: "shuffle",
            element:
                <Suspense>
                    <ShufflePageContextProvider>
                        <Shuffle />
                    </ShufflePageContextProvider>
                </Suspense>
        }, {
            path: "recent",
            element:
                <Suspense>
                    <Recent />
                </Suspense>
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
