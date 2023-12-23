import cardParser from "./cardParser.js";
import videoRenderer from "./videoRenderer.js";

export default function feedParser(json) {
    let list = []
    if (json?.horizontalListRenderer) {
        const listItems = json.horizontalListRenderer.items;

        listItems.length ? listItems.map((x) => {


            if (x.compactStationRenderer) {
                const json = x.compactStationRenderer;


                list.push({
                    type: 'album',
                    title: json.title.simpleText,
                    description: json.description.simpleText,
                    videos: json.videoCountText?.runs?.map((x) => x.text).join(''),
                    thumbnails: json.thumbnail.thumbnails,
                });
            } else if (x?.gridVideoRenderer) {
                list.push(cardParser(x));

            } else if (x?.gridPlaylistRenderer) {
                list.push(cardParser(x));
                
            } else if (x.gridChannelRenderer) { // Channel List Parser
                const json = x.gridChannelRenderer;

                let artist = false;
                if (
                    json.ownerBadges &&
                    json.ownerBadges.length > 0 &&
                    json.ownerBadges[0].metadataBadgeRenderer &&
                    ["OFFICIAL_ARTIST_BADGE", "BADGE_STYLE_TYPE_VERIFIED_ARTIST"]
                        .includes(json.ownerBadges[0].metadataBadgeRenderer.style)
                ) {
                    artist = true;
                }

                let verified = false;
                if (
                    json.ownerBadges &&
                    json.ownerBadges.length > 0 &&
                    json.ownerBadges[0].metadataBadgeRenderer &&
                    json.ownerBadges[0].metadataBadgeRenderer.style ===
                    "BADGE_STYLE_TYPE_VERIFIED"
                ) {
                    verified = true;
                }

                const channelUrl = json.navigationEndpoint.commandMetadata.webCommandMetadata.url;

                const channel = {
                    id: json?.channelId,
                    type: 'channel',
                    title: json?.title?.simpleText,
                    url: channelUrl ? channelUrl?.replace('/@', '/channel/') : '',
                    avatar: json?.thumbnail?.thumbnails,
                    videos: json?.videoCountText?.runs?.map((x) => x.text).join(''),
                    subscribers: json?.subscriberCountText?.simpleText,
                    verified,
                    artist,
                };

                list.push(channel);
            }

        }) : list.push('Nothing');
    } else if (json?.horizontalMovieListRenderer) {
        const listItems = json.horizontalMovieListRenderer.items;

        listItems.length ? listItems.map((x) => {

            if (x.gridMovieRenderer) {

                const json = x.gridMovieRenderer;

                let badges = [];
                if (
                    json.badges &&
                    json.badges.length > 0) {
                    badges = json.badges.map((x) => x.metadataBadgeRenderer.label);
                }

                list.push({
                    id: json.videoId,
                    type: "movie",
                    title: json.title?.runs?.map((x) => x.text).join(''),
                    length: json.lengthText?.simpleText,
                    category: json?.metadata?.simpleText,
                    thumbnails: json?.thumbnail?.thumbnails[0],
                    badges,
                });
            }

        }) : null



    } else if (json?.expandedShelfContentsRenderer) {

        const listItems = json.expandedShelfContentsRenderer.items;

        listItems.length ? listItems.map((x) => {

            if (x.videoRenderer) {
                list.push(videoRenderer(x.videoRenderer));
            }

        }) : ''


    } else if (json?.verticalListRenderer) {

        const listItems = json.verticalListRenderer.items;

        listItems.length ? listItems.map((x) => {

            if (x.videoRenderer) {
                list.push(videoRenderer(x.videoRenderer));
            }

        }) : ''

    } else if (json?.playlistRenderer) {
        const playlist = json.playlistRenderer;

        let artist = false;
        if (
            playlist.ownerBadges &&
            playlist.ownerBadges.length > 0 &&
            playlist.ownerBadges[0].metadataBadgeRenderer &&
            ["OFFICIAL_ARTIST_BADGE", "BADGE_STYLE_TYPE_VERIFIED_ARTIST"]
                .includes(playlist.ownerBadges[0].metadataBadgeRenderer.style)
        ) {
            artist = true;
        }

        let verified = false;
        if (
            playlist.ownerBadges &&
            playlist.ownerBadges.length > 0 &&
            playlist.ownerBadges[0].metadataBadgeRenderer &&
            playlist.ownerBadges[0].metadataBadgeRenderer.style ===
            "BADGE_STYLE_TYPE_VERIFIED"
        ) {
            verified = true;
        }

        const channelUrl = playlist.shortBylineText.runs[0].navigationEndpoint.commandMetadata.webCommandMetadata.url;

        const videos = playlist.videos.map((x) => {
            const childVideoRenderer = x.childVideoRenderer;

            return {
                id: childVideoRenderer.videoId,
                title: childVideoRenderer.title?.simpleText,
                length: childVideoRenderer.lengthText?.simpleText,
            }
        });

        list = {
            id: playlist.playlistId,
            type: "playlist",
            title: playlist.title.simpleText,
            channel: {
                id: channelUrl ? channelUrl?.replace('/', '') : '',
                title: playlist?.shortBylineText?.runs?.map((x) => x.text).join(''),
                url: channelUrl ? channelUrl?.replace('/@', '/channel/') : '',
                verified,
                artist,
            },
            length: playlist.videoCount,
            thumbnail: playlist?.thumbnails[0]?.thumbnails[0],
            videos,
            videoCount: playlist.videoCount,
        }

    } else if (json?.horizontalCardListRenderer) {

        const listItems = json.horizontalCardListRenderer.cards;

        listItems.length ? listItems.map((x) => {

            if (x.gameCardRenderer) {

                const game = x.gameCardRenderer.game.gameDetailsRenderer;

                list.push({
                    type: "game",
                    title: game?.title?.simpleText,
                    url: game?.endpoint?.commandMetadata?.webCommandMetadata?.url,
                    thumbnail: game?.boxArt?.thumbnails[0],
                    views: game?.liveViewersText?.runs.map((x) => x.text).join(''),
                    verified: Boolean(game?.isOfficialBoxArt),
                });
            } else if (x.videoCardRenderer) {
                list.push(cardParser(x));
            }

        }) : ''

    } else if (json?.gridRenderer) {
        const listItems = json.gridRenderer.items;

        listItems.length ? listItems.map((x) => {

            if (x.gridVideoRenderer) {

                list.push(cardParser(x));
            } else if (x.videoCardRenderer) {
                list.push(cardParser(x));
            }

        }) : ''
    }

    return list;
}

function gridVideoRenderer(json) {
    if (!json?.videoId) {
        return {};
    }

    let artist = false;
    if (
        json.ownerBadges &&
        json.ownerBadges.length > 0 &&
        json.ownerBadges[0].metadataBadgeRenderer &&
        ["OFFICIAL_ARTIST_BADGE", "BADGE_STYLE_TYPE_VERIFIED_ARTIST"]
            .includes(json.ownerBadges[0].metadataBadgeRenderer.style)
    ) {
        artist = true;
    }

    let verified = false;
    if (
        json.ownerBadges &&
        json.ownerBadges.length > 0 &&
        json.ownerBadges[0].metadataBadgeRenderer &&
        json.ownerBadges[0].metadataBadgeRenderer.style ===
        "BADGE_STYLE_TYPE_VERIFIED"
    ) {
        verified = true;
    }

    const channelUrl = json.shortBylineText.runs[0].navigationEndpoint.commandMetadata.webCommandMetadata.url;

    const channel = {
        id: channelUrl ? channelUrl?.replace('/@', '') : '',
        title: json.shortBylineText.runs?.map((x) => x.text).join(''),
        url: channelUrl ? channelUrl?.replace('/@', '/channel/') : '',
        verified,
        artist,
    };

    return {
        id: json.videoId,
        type: "video",
        title: json.title?.simpleText,
        thumbnails: json.thumbnail?.thumbnails,
        publishedAt: json?.publishedTimeText?.simpleText,
        views: json?.shortViewCountText?.simpleText,
        channel,
    };
}