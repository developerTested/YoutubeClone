import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Channel from "./pages/Channel";
import HomePage from "./pages/Home";
import WatchPage from "./pages/Watch";
import SearchPage from "./pages/Search";
import RootLayout from "./components/RootLayout";
import ErrorPage from "./components/ErrorPage";
import TrendingPage from "./pages/Trending";

const routeList = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <HomePage />
            },

            {
                path: '/trending',
                element: <TrendingPage />
            },

            {
                path: '/search',
                element: <SearchPage />
            },

            {
                path: '/watch/:id',
                element: <WatchPage />,
                sidebar: false,
            },
            {
                path: '/channel/:id',
                element: <Channel />,
                sidebar: false,
            },

            {
                path: "about",
                element: <div>About</div>,
            },
        ],
    }

]);

export default routeList