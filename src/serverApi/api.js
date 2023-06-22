import express from 'express';
import ViteExpress from "vite-express";
import cors from 'cors';

import { GetHomeFeed, GetData, GetChannelById, GetPlaylistData, GetShortVideo, GetVideoDetails, GetSuggestData } from "./parser.js";

const port = process.env.PORT || 3000;

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
    port: port,
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

/**
 * Get Home page videos
 */
app.get('/api/', async function (req, res) {

    const recentUpdates = await GetSuggestData(30, [{ type: 'video' }]);
    res.status(200).json(recentUpdates);
});

/**
 * Get Search results
 */
app.get('/api/search', async function (req, res) {

    try {

        const keyword = req.query.keyword;

        const searchResults = await GetData(keyword, false, 30, [{ type: 'video', sortBy: 'upload_date' }]);

        res.status(200).json(searchResults);

    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error,
        });
    }

});

/**
 * Get Video details with suggestions
 */
app.get('/api/watch/:id', async function (req, res) {

    const videoId = req.params.id;
    const video = await GetVideoDetails(videoId);

    res.status(200).json(video);

});

/**
 * Get Channel details 
 */
app.get('/api/channel/:id', async function (req, res) {

    const channelId = req.params.id;

    const channel = await GetChannelById(channelId);

    res.status(200).json(channel);

});

ViteExpress.listen(app, port, () => {
    console.log('Express server listening on port %d in %s mode', port, app.settings.env);
});
