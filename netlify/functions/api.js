import serverless from 'serverless-http';
import express, { Router } from 'express';
import cors from 'cors';

import {
    GetData,
    GetChannelById,
    GetVideoDetails,
    GetSuggestData,
    getTrending,
    getAutoCompleteSearch
} from "../../src/serverApi/parser";

const port = process.env.PORT || 3000;

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
    port: port,
};

const errorHandler = (error, req, res, next) => {
    // Logging the error here
    console.log(error);
    // Returning the status and error message to client
    res.status(400).send(error.message);
}

const router = Router();

/**
 * Get Home page videos
 */
router.get('/api/', async function (req, res, next) {
    try {
        const recentUpdates = await GetSuggestData(30, [{ type: 'video' }]);
        res.status(200).json(recentUpdates);
    } catch (error) {
        next(error)
    }
});

/**
 * AutoComplete Search
 */
router.get('/api/autocomplete', async function (req, res, next) {
    try {

        const keyword = req.query.q;

        const recentUpdates = await getAutoCompleteSearch(keyword);
        res.status(200).json(recentUpdates);
    } catch (error) {
        next(error)
    }
});

/**
 * Get Search results
 */
router.get('/api/search', async function (req, res, next) {

    try {

        const keyword = req.query.keyword;

        const searchResults = await GetData(keyword, false, 30, [{ type: 'video', sortBy: 'upload_date' }]);

        res.status(200).json(searchResults);

    } catch (error) {
        next(error)
    }

});

/**
 * Get Video details with suggestions
 */
router.get('/api/watch/:id', async function (req, res, next) {

    try {
        const videoId = req.params.id;
        const video = await GetVideoDetails(videoId);

        res.status(200).json(video);
    } catch (error) {
        next(error);
    }

});

/**
 * Get Channel details 
 */
router.get('/api/channel/:id', async function (req, res, next) {

    try {
        const channelId = req.params.id;

        const channel = await GetChannelById(channelId);

        res.status(200).json(channel);
    } catch (error) {
        next(error);
    }

});

/**
 * Menus
 */
router.get('/api/trending', async function (req, res, next) {

    try {
        const name = req.params.name;

        const contents = await getTrending();

        res.status(200).json(contents);

    } catch (error) {
        next(error);
    }
});

const api = express();

api.use(cors(corsOptions));
api.use(express.json());
api.use(errorHandler);

export const handler = serverless(api);