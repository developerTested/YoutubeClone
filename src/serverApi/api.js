import express from 'express';
import ViteExpress from "vite-express";
import cors from 'cors';

import {
    GetData,
    GetChannelById,
    GetVideoDetails,
    GetSuggestData,
    getTrending
} from "./parser.js";

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

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(errorHandler);

/**
 * Get Home page videos
 */
app.get('/api/', async function (req, res, next) {
    try {
        const recentUpdates = await GetSuggestData(30, [{ type: 'video' }]);
        res.status(200).json(recentUpdates);
    } catch (error) {
        next(error)
    }
});

/**
 * Get Search results
 */
app.get('/api/search', async function (req, res, next) {

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
app.get('/api/watch/:id', async function (req, res, next) {

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
app.get('/api/channel/:id', async function (req, res, next) {

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
app.get('/api/trending', async function (req, res, next) {

    try {
        const name = req.params.name;

        const contents = await getTrending();

        res.status(200).json(contents);

    } catch (error) {
        next(error);
    }
});

/*
app.listen(port, 'localhost', () => {
    console.log('Express server listening on port %d in %s mode', port, app.settings.env);
});
*/
ViteExpress.listen(app, port, () => {
    console.log('Express server listening on port %d in %s mode', port, app.settings.env);
});