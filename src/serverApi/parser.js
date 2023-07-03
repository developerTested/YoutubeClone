import axios from "axios";
import apiList from "./apiRoutes.js";

const youtubeEndpoint = `https://www.youtube.com`;

const config = {
    baseURL: youtubeEndpoint,
    timeout: 60 * 1000,
    withCredentials: true,
};

const YoutubeSearchApi = axios.create(config);

export const GetYoutubeInitData = async (url) => {
    var initdata = await {};
    var apiToken = await null;
    var context = await null;

    try {
        const page = await YoutubeSearchApi.get(encodeURI(url));
        const ytInitData = await page.data.split("var ytInitialData =");
        if (ytInitData && ytInitData.length > 1) {
            const data = await ytInitData[1].split("</script>")[0].slice(0, -1);

            if (page.data.split("innertubeApiKey").length > 0) {
                apiToken = await page.data
                    .split("innertubeApiKey")[1]
                    .trim()
                    .split(",")[0]
                    .split('"')[2];
            }

            if (page.data.split("INNERTUBE_CONTEXT").length > 0) {
                context = await JSON.parse(
                    page.data.split("INNERTUBE_CONTEXT")[1].trim().slice(2, -2)
                );
            }

            initdata = await JSON.parse(data);
            return await Promise.resolve({ initdata, apiToken, context });
        } else {
            console.error("cannot_get_init_data");
            return await Promise.reject("cannot_get_init_data");
        }
    } catch (ex) {
        await console.error(ex);
        return await Promise.reject(ex);
    }
};

export const GetData = async (
    keyword,
    withPlaylist = false,
    limit = 0,
    options = []
) => {


    let endpoint = await `${youtubeEndpoint}/results?search_query=${keyword}`;
    try {
        if (Array.isArray(options) && options.length > 0) {
            const type = options.find((z) => z.type);
            const order = options.find((z) => z.sortBy);
            if (typeof type === "object") {
                if (typeof type.type == "string") {
                    switch (type.type.toLowerCase()) {
                        case "video":
                            endpoint = `${endpoint}&sp=EgQIAxAB%3D%3D`;
                            break;
                        case "channel":
                            endpoint = `${endpoint}&sp=EgIQAg%253D%253D`;
                            break;
                        case "playlist":
                            endpoint = `${endpoint}&sp=EgIQAw%253D%253D`;
                            break;
                        case "movie":
                            endpoint = `${endpoint}&sp=EgIQBA%3D%3D`;
                            break;
                    }
                }
            }
            if (typeof sortBy === 'object') {
                if (typeof sortBy.sortBy == "string") {
                    switch (sortBy.sortBy.toLowerCase()) {
                        case "relevance":
                            endpoint = `${endpoint}&sp=CAASAhAE`;
                        case "upload_date":
                            endpoint = `${endpoint}&sp=CAISAhAB`;
                            break;
                        case "popular":
                            endpoint = `${endpoint}&sp=CAMSAhAB`;
                            break;
                        case "rating":
                            endpoint = `${endpoint}&sp=CAESAhAB`;
                            break;
                    }
                }
            }
        }

        const page = await GetYoutubeInitData(endpoint);

        const sectionListRenderer = await page.initdata.contents
            .twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer;

        let contToken = await {};

        let items = await [];

        await sectionListRenderer.contents.forEach((content) => {
            if (content.continuationItemRenderer) {
                contToken =
                    content.continuationItemRenderer.continuationEndpoint
                        .continuationCommand.token;
            } else if (content.itemSectionRenderer) {
                content.itemSectionRenderer.contents.forEach((item) => {
                    if (item.channelRenderer) {
                        let channelRenderer = item.channelRenderer;
                        items.push(parseChannelRender(channelRenderer));
                    } else {
                        let videoRender = item.videoRenderer;
                        let playListRender = item.playlistRenderer;

                        if (videoRender && videoRender.videoId) {
                            items.push(parseVideoRender(videoRender));
                        }
                        if (withPlaylist) {
                            if (playListRender && playListRender.playlistId) {
                                items.push({
                                    id: playListRender.playlistId,
                                    type: "playlist",
                                    thumbnail: playListRender.thumbnails,
                                    title: playListRender.title.simpleText,
                                    length: playListRender.videoCount,
                                    videos: playListRender.videos,
                                    videoCount: playListRender.videoCount,
                                    isLive: false
                                });
                            }
                        }
                    }
                });
            }
        });
        const apiToken = await page.apiToken;
        const context = await page.context;
        const nextPageContext = await { context: context, continuation: contToken };
        const itemsResult = limit != 0 ? items.slice(0, limit) : items;
        return await Promise.resolve({
            items: itemsResult,
            nextPage: { nextPageToken: apiToken, nextPageContext: nextPageContext }
        });
    } catch (ex) {
        await console.error(ex);
        return await Promise.reject(ex);
    }
};

export const nextPage = async (nextPage, withPlaylist = false, limit = 0) => {
    const endpoint =
        await `${youtubeEndpoint}/youtubei/v1/search?key=${nextPage.nextPageToken}`;
    try {
        const page = await axios.post(
            encodeURI(endpoint),
            nextPage.nextPageContext
        );
        const item1 =
            page.data.onResponseReceivedCommands[0].appendContinuationItemsAction;
        let items = [];
        item1.continuationItems.forEach((conitem) => {
            if (conitem.itemSectionRenderer) {
                conitem.itemSectionRenderer.contents.forEach((item, index) => {
                    let videoRender = item.videoRenderer;
                    let playListRender = item.playlistRenderer;
                    if (videoRender && videoRender.videoId) {
                        items.push(parseVideoRender(item));
                    }
                    if (withPlaylist) {
                        if (playListRender && playListRender.playlistId) {
                            items.push({
                                id: playListRender.playlistId,
                                type: "playlist",
                                thumbnail: playListRender.thumbnails,
                                title: playListRender.title.simpleText,
                                length: playListRender.videoCount,
                                videos: GetPlaylistData(playListRender.playlistId)
                            });
                        }
                    }
                });
            } else if (conitem.continuationItemRenderer) {
                nextPage.nextPageContext.continuation =
                    conitem.continuationItemRenderer.continuationEndpoint.continuationCommand.token;
            }
        });
        const itemsResult = limit != 0 ? items.slice(0, limit) : items;
        return await Promise.resolve({ items: itemsResult, nextPage: nextPage });
    } catch (ex) {
        await console.error(ex);
        return await Promise.reject(ex);
    }
};

export const GetPlaylistData = async (playlistId, limit = 0) => {
    const endpoint = await `${youtubeEndpoint}/playlist?list=${playlistId}`;
    try {
        const initData = await GetYoutubeInitData(endpoint);
        const sectionListRenderer = await initData.initdata;
        const metadata = await sectionListRenderer.metadata;
        if (sectionListRenderer && sectionListRenderer.contents) {
            const videoItems = await sectionListRenderer.contents
                .twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content
                .sectionListRenderer.contents[0].itemSectionRenderer.contents[0]
                .playlistVideoListRenderer.contents;
            let items = await [];
            await videoItems.forEach((item) => {
                let videoRender = item.playlistVideoRenderer;
                if (videoRender && videoRender.videoId) {
                    items.push(parseVideoRender(item));
                }
            });
            const itemsResult = limit != 0 ? items.slice(0, limit) : items;
            return await Promise.resolve({ items: itemsResult, metadata: metadata });
        } else {
            return await Promise.reject("invalid_playlist");
        }
    } catch (ex) {
        await console.error(ex);
        return await Promise.reject(ex);
    }
};

/**
 * Get Home Feed
 * @param {*} limit 
 * @returns 
 */
export const GetSuggestData = async (limit = 0) => {
    const endpoint = await `${youtubeEndpoint}`;
    try {
        const page = await GetYoutubeInitData(endpoint);
        const sectionListRenderer = await page.initdata.contents
            .twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content
            .richGridRenderer.contents;
        let items = await [];
        let otherItems = await [];
        await sectionListRenderer.forEach((item) => {
            if (item.richItemRenderer && item.richItemRenderer.content) {
                let videoRender = item.richItemRenderer.content.videoRenderer;
                if (videoRender && videoRender.videoId) {
                    items.push(parseVideoRender(videoRender));
                } else {
                    otherItems.push(videoRender);
                }
            }
        });
        const itemsResult = limit != 0 ? items.slice(0, limit) : items;
        return await Promise.resolve({ items: itemsResult, shorts: otherItems });
    } catch (ex) {
        await console.error(ex);
        return await Promise.reject(ex);
    }
};

export const GetChannelById = async (channelId) => {
    const endpoint = await `${youtubeEndpoint}/@${channelId}`;
    try {
        const page = await GetYoutubeInitData(endpoint);
        const tabs = page.initdata.contents.twoColumnBrowseResultsRenderer.tabs;
        const metadata = page.initdata.metadata.channelMetadataRenderer;
        const channelHeader = page.initdata.header.c4TabbedHeaderRenderer;

        let verified = false;
        if (
            channelHeader.badges &&
            channelHeader.badges.length > 0 &&
            channelHeader.badges[0].metadataBadgeRenderer &&
            channelHeader.badges[0].metadataBadgeRenderer.style ===
            "BADGE_STYLE_TYPE_VERIFIED"
        ) {
            verified = true;
        }

        const links = [];

        const primaryLinks = channelHeader?.headerLinks?.channelHeaderLinksRenderer?.primaryLinks;
        const secondaryLinks = channelHeader?.headerLinks?.channelHeaderLinksRenderer?.secondaryLinks;

        if (primaryLinks) {
            primaryLinks.length && primaryLinks.map((x) => links.push({
                title: x.title.simpleText,
                icon: x.icon.thumbnails[0].url,
                url: x.navigationEndpoint.urlEndpoint.url,
            }))
        }

        if (secondaryLinks) {
            secondaryLinks.length && secondaryLinks.map((x) => links.push({
                title: x.title.simpleText,
                icon: x.icon.thumbnails[0].url,
                url: x.navigationEndpoint.urlEndpoint.url,
            }))
        }

        const channel = {
            id: channelHeader.channelHandleText.runs[0].text,
            title: metadata.title,
            avatar: channelHeader.avatar.thumbnails,
            links,
            verified,
        }

        const items = tabs
            .map((json) => {
                if (json && json.tabRenderer) {
                    const tabRenderer = json.tabRenderer;
                    const title = tabRenderer.title;
                    const content = tabRenderer.content;
                    return content;
                }
            })
            .filter((y) => typeof y != "undefined")
            .map((x) => x.sectionListRenderer.contents).flat()
            .map((y) => y.itemSectionRenderer.contents).flat()
            .map((z) => z.shelfRenderer);

        const itemList = items.filter((x) => x?.content?.horizontalListRenderer)
            .map((x) => ({ title: x.title.runs[0].text, contents: x?.content?.horizontalListRenderer })) ?? [];

        const results = [];

        if (itemList.length) {
            itemList.forEach((x) => {

                const b = x.contents.items.map((x) => {

                    let json = null;
                    if (x.gridVideoRenderer) {
                        json = x.gridVideoRenderer;

                        return {
                            id: json.videoId,
                            type: "video",
                            title: json.title.simpleText,
                            channel,
                            publishedAt: json.publishedTimeText.simpleText,
                            views: json.shortViewCountText.simpleText,
                            thumbnails: json.thumbnail.thumbnails,
                        };

                    } else if (x.gridPlaylistRenderer) {
                        json = x.gridPlaylistRenderer;

                        return {
                            id: json.playlistId,
                            type: "playlist",
                            thumbnails: json.thumbnail.thumbnails,
                            title: json.title.runs[0].text,
                            publishedAt: json.publishedTimeText?.simpleText,
                            length: json.videoCountText.runs.map((x) => x.text).join(''),
                            videos: json.videoCountText.runs.map((x) => x.text).join(''),
                            videoCount: json.videoCountShortText.simpleText,
                            isLive: false
                        }

                    }
                    else {
                        return [];
                    }

                });

                const cd = {
                    title: x.title,
                    videos: b,
                }

                results.push(cd);
            })

        }

        const channelJson = {
            ...channel,
            description: metadata.description,
            subscriber: channelHeader.subscriberCountText.simpleText,
            videos: channelHeader.videosCountText?.runs?.map((x) => x.text).join(''),
            results: results.filter((x) => !x?.title?.includes('Channels')),
        }

        return await Promise.resolve(channelJson);
    } catch (ex) {
        return await Promise.reject(ex);
    }
};

export const GetVideoDetails = async (videoId) => {
    const endpoint = await `${youtubeEndpoint}/watch?v=${videoId}`;
    try {
        const page = await GetYoutubeInitData(endpoint);
        const result = await page.initdata.contents.twoColumnWatchNextResults;

        const videoInfo = await result.results.results.contents[0]
            .videoPrimaryInfoRenderer;
        const channelInfo = await result.results.results.contents[1]
            .videoSecondaryInfoRenderer;

        var isLive = false;
        if (videoInfo.viewCount.videoViewCountRenderer.hasOwnProperty("isLive")) {
            isLive = true;
        }

        const likeCount = videoInfo?.videoActions?.menuRenderer?.topLevelButtons[0]?.segmentedLikeDislikeButtonRenderer?.likeButton?.toggleButtonRenderer?.defaultText?.simpleText ?? 0;

        const viewCount = isLive ? videoInfo?.viewCount?.videoViewCountRenderer?.viewCount?.runs?.map((x) => x.text).join('') : videoInfo.viewCount.videoViewCountRenderer?.shortViewCount?.simpleText;

        const suggestionList = result.secondaryResults.secondaryResults.results
            .filter((y) => y.compactVideoRenderer)
            .map((x) => compactVideoRenderer(x));

        const channelUrl = channelInfo.owner.videoOwnerRenderer.navigationEndpoint.commandMetadata.webCommandMetadata.url;

        const channel = {
            id: channelUrl ? channelUrl?.replace('/@', '') : '',
            title: channelInfo.owner.videoOwnerRenderer.title.runs[0].text,
            url: channelUrl ? channelUrl?.replace('/@', '/channel/') : '',
            subscriber: channelInfo.owner.videoOwnerRenderer.subscriberCountText.simpleText,
            avatar: channelInfo.owner.videoOwnerRenderer.thumbnail.thumbnails,
        }

        const res = {
            id: videoId,
            title: videoInfo.title.runs[0].text,
            views: viewCount ?? 0,
            likes: likeCount,
            publishedAt: isLive ? videoInfo?.dateText?.simpleText : videoInfo?.relativeDateText?.simpleText,
            description: channelInfo.attributedDescription.content,
            channel,
            suggestion: suggestionList,
            isLive,
        }

        return await Promise.resolve(res);
    } catch (ex) {
        return await Promise.reject(ex);
    }
};

export const VideoRender = (json) => {

    try {
        if (json && (json.videoRenderer || json.playlistVideoRenderer)) {
            let videoRenderer = null;
            if (json.videoRenderer) {
                videoRenderer = json.videoRenderer;
            } else if (json.playlistVideoRenderer) {
                videoRenderer = json.playlistVideoRenderer;
            }
            var isLive = false;
            if (
                videoRenderer.badges &&
                videoRenderer.badges.length > 0 &&
                videoRenderer.badges[0].metadataBadgeRenderer &&
                videoRenderer.badges[0].metadataBadgeRenderer.style ===
                "BADGE_STYLE_TYPE_LIVE_NOW"
            ) {
                isLive = true;
            }
            if (videoRenderer.thumbnailOverlays) {
                videoRenderer.thumbnailOverlays.forEach((item) => {
                    if (
                        item.thumbnailOverlayTimeStatusRenderer &&
                        item.thumbnailOverlayTimeStatusRenderer.style &&
                        item.thumbnailOverlayTimeStatusRenderer.style === "LIVE"
                    ) {
                        isLive = true;
                    }
                });
            }
            const id = videoRenderer.videoId;
            const thumbnails = videoRenderer.thumbnail;
            const title = videoRenderer.title.runs[0].text;
            const shortBylineText = videoRenderer.shortBylineText ? videoRenderer.shortBylineText : "";
            const lengthText = videoRenderer.lengthText ? videoRenderer.lengthText : "";
            const channelTitle = videoRenderer.ownerText && videoRenderer.ownerText.runs ? videoRenderer.ownerText.runs[0].text : "";

            const views = videoRenderer.viewCountText ? videoRenderer.viewCountText?.simpleText : '';

            return {
                id,
                type: "video",
                ...thumbnails,
                title,
                channelTitle,
                shortBylineText,
                stats: {
                    views,
                },
                length: lengthText,
                isLive
            };
        } else {
            return {};
        }
    } catch (ex) {
        throw ex;
    }
};

export const compactVideoRenderer = (json) => {
    const compactVideoRendererJson = json.compactVideoRenderer;

    let isLive = false;
    if (
        compactVideoRendererJson.badges &&
        compactVideoRendererJson.badges.length > 0 &&
        compactVideoRendererJson.badges[0].metadataBadgeRenderer &&
        compactVideoRendererJson.badges[0].metadataBadgeRenderer.style ===
        "BADGE_STYLE_TYPE_LIVE_NOW"
    ) {
        isLive = true;
    }

    let verified = false;
    if (
        compactVideoRendererJson.ownerBadges &&
        compactVideoRendererJson.ownerBadges.length > 0 &&
        compactVideoRendererJson.ownerBadges[0].metadataBadgeRenderer &&
        compactVideoRendererJson.ownerBadges[0].metadataBadgeRenderer.style ===
        "BADGE_STYLE_TYPE_VERIFIED"
    ) {
        verified = true;
    }


    const channelUrl = compactVideoRendererJson.shortBylineText.runs[0].navigationEndpoint.commandMetadata.webCommandMetadata.url;
    const channelAvatar = compactVideoRendererJson.channelThumbnail.thumbnails[0];

    const channel = {
        id: channelUrl ? channelUrl?.replace('/@', '') : '',
        title: compactVideoRendererJson.shortBylineText.runs[0].text,
        url: channelUrl ? channelUrl?.replace('/@', '/channel/') : '',
        avatar: channelAvatar,
        verified,
    };

    const result = {
        id: compactVideoRendererJson.videoId,
        type: "video",
        thumbnails: compactVideoRendererJson.thumbnail.thumbnails,
        title: compactVideoRendererJson.title?.simpleText,
        channel,
        length: compactVideoRendererJson?.lengthText?.simpleText,
        views: compactVideoRendererJson.shortViewCountText.simpleText,
        publishedAt: compactVideoRendererJson?.publishedTimeText?.simpleText,
        isLive,
    };

    return result;
};


export async function getTrending() {
    const page = await GetYoutubeInitData(apiList['trending']);

    const results = await page.initdata.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content;
    const items = results.sectionListRenderer.contents
        .filter((x) => x.itemSectionRenderer)
        .map((z) => z.itemSectionRenderer.contents).flat();

    let itemList = [];
    const otherItems = [];
    const shortsList = [];

    items.map((x) => {

        if (x.shelfRenderer) {
            itemList = parseTrending(x.shelfRenderer.content);
        } else if (x.reelShelfRenderer) {
            const shortsResult = x.reelShelfRenderer.items;
            shortsResult.map(({ reelItemRenderer: json }) => shortsList.push({
                id: json.videoId,
                type: "reel",
                thumbnail: json.thumbnail.thumbnails[0],
                title: json.headline.simpleText,
            }));
        } else {
            return [];
        }

    })

    return {
        items: itemList,
        shorts: shortsList,
        otherItems,
    };
}

export async function getFeed(name) {
    const youtubeEndpoint = name ? apiList[name] : youtubeEndpoint;
    const page = await GetYoutubeInitData(youtubeEndpoint);

    const results = await page.initdata.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content;
    const items = results.sectionListRenderer.contents
        .filter((x) => x.itemSectionRenderer)
        .map((z) => z.itemSectionRenderer.contents).flat();

    const itemList = [];
    const otherItems = [];
    const shortsList = [];





    items.map((z) => {


        if (z.shelfRenderer) {


            const contents = z.shelfRenderer.content;


            let items = [];


            switch (name) {
                case 'trending':
                    items = contents.expandedShelfContentsRenderer.items;
                    itemList.push(parseTrending(z));
                    break;

                case 'shopping':

                    if (contents.verticalListRenderer) {
                        items = contents.verticalListRenderer.items;
                        itemList.push(parseTrending(items));
                    } else {
                        return false;
                    }

                    break;

                case 'music':
                    items = contents.horizontalListRenderer.items;
                    itemList.push(parseTrending(items));
                    break;

                case 'movies':
                    items = contents.horizontalListRenderer.items;
                    itemList.push(parseTrending(items));
                    break;

                case 'live':
                    items = contents.horizontalListRenderer.items;
                    itemList.push(parseTrending(items));
                    break;

                case 'gaming':
                    items = contents.horizontalListRenderer.items;
                    itemList.push(parseTrending(items));
                    break;

                case 'news':
                    items = contents.horizontalListRenderer.items;
                    itemList.push(parseTrending(items));
                    break;

                case 'sports':
                    items = contents.horizontalListRenderer.items;
                    itemList.push(parseTrending(items));
                    break;

                case 'learning':
                    items = contents.horizontalListRenderer.items;
                    itemList.push(parseTrending(items));
                    break;

                case 'fashion':
                    items = contents.horizontalListRenderer.items;
                    itemList.push(parseTrending(items));
                    break;


                default:
                    break;
            }


        } else if (z.reelShelfRenderer) {

            let items = z.reelShelfRenderer.items;

            const b = items.map(({ reelItemRenderer: x }) => shortsList.push({
                id: x.videoId,
                type: "reel",
                thumbnail: x.thumbnail.thumbnails[0],
                title: x.headline.simpleText,
                views: x.viewCountText?.simpleText,
            }));

        } else {
            otherItems.push(z)
        }
    });


    return await Promise.resolve({ items: itemList, otherItems, shortsList });
}

export const GetHomeFeed = async () => {
    const page = await GetYoutubeInitData(youtubeEndpoint);

    const results = await page.initdata.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.richGridRenderer.contents
        .filter((x) => x.richSectionRenderer)
        .map((z) => z.richSectionRenderer.content)
        .filter((y) => y.richShelfRenderer)
        .map((u) => u.richShelfRenderer);

    const shortResult = results.find((i) => i.title.runs[0].text === "Shorts");

    const trendingResult = results.find((i) => i.title.runs[0].text !== "Shorts");

    const shorts = parseShortVideo(shortResult);

    const trendingResponse = await trendingResult.contents
        .map((z) => z.richItemRenderer)
        .map((y) => y.content.videoRenderer);
    const trending = trendingResponse.map((json) => parseVideoRender(json));

    return {
        shorts,
        videos: trending,
    }

};


export const GetShortVideo = async () => {
    const page = await GetYoutubeInitData(youtubeEndpoint);
    const shortResult =
        await page.initdata.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.richGridRenderer.contents
            .filter((x) => {
                return x.richSectionRenderer;
            })
            .map((z) => z.richSectionRenderer.content)
            .filter((y) => y.richShelfRenderer)
            .map((u) => u.richShelfRenderer)
            .find((i) => i.title.runs[0].text === "Shorts");
    const res = await shortResult.contents
        .map((z) => z.richItemRenderer)
        .map((y) => y.content.reelItemRenderer);
    return await res.map((json) => ({
        id: json.videoId,
        type: "reel",
        thumbnail: json.thumbnail.thumbnails[0],
        title: json.headline.simpleText,
        inlinePlaybackEndpoint: json.inlinePlaybackEndpoint || {}
    }));
};


export function getPlayerFromId(videoId) {

}


/**
 * Helper function for parser
 */

/**
 * parse Video Container
 * @param {*} response 
 * @returns object
 */
function parseVideoRender(response) {

    if (!response.videoId) {
        return response;
    }

    var isLive = false;
    if (
        response.badges &&
        response.badges.length > 0 &&
        response.badges[0].metadataBadgeRenderer &&
        response.badges[0].metadataBadgeRenderer.style ===
        "BADGE_STYLE_TYPE_LIVE_NOW"
    ) {
        isLive = true;
    }
    if (response.thumbnailOverlays) {
        response.thumbnailOverlays.forEach((item) => {
            if (
                item.thumbnailOverlayTimeStatusRenderer &&
                item.thumbnailOverlayTimeStatusRenderer.style &&
                item.thumbnailOverlayTimeStatusRenderer.style === "LIVE"
            ) {
                isLive = true;
            }
        });
    }

    let badges = [];
    if (
        response.badges &&
        response.badges.length > 0) {
        badges = response.badges.map((x) => x.metadataBadgeRenderer.label);
    }

    let verified = false;
    if (
        response.ownerBadges &&
        response.ownerBadges.length > 0 &&
        response.ownerBadges[0].metadataBadgeRenderer &&
        response.ownerBadges[0].metadataBadgeRenderer.style ===
        "BADGE_STYLE_TYPE_VERIFIED"
    ) {
        verified = true;
    }

    const channelUrl = response.ownerText.runs[0].navigationEndpoint.commandMetadata.webCommandMetadata.url;
    const channelAvatar = response.channelThumbnailSupportedRenderers.channelThumbnailWithLinkRenderer.thumbnail.thumbnails[0];

    const channel = {
        id: channelUrl ? channelUrl?.replace('/@', '') : '',
        title: response.ownerText.runs[0].text,
        url: channelUrl ? channelUrl?.replace('/@', '/channel/') : '',
        avatar: channelAvatar,
        verified,
    };

    const hasDescription = response.hasOwnProperty('detailedMetadataSnippets');
    const hasDescriptionSnippet = response.hasOwnProperty('descriptionSnippet');

    const descriptionSnippet = hasDescription ? response?.detailedMetadataSnippets[0].snippetText?.runs?.map((x) => x.text).join('') : false;

    const descriptionTwoSnippet = hasDescriptionSnippet ? response.descriptionSnippet?.runs?.map((x) => x.text).join('') : false;

    const viewsCount = isLive ? response.shortViewCountText?.runs?.map((x) => x.text).join('') : response.shortViewCountText?.simpleText;

    const description = descriptionSnippet || descriptionTwoSnippet || '';

    const result = {
        id: response.videoId,
        type: isLive ? "Live" : "video",
        thumbnails: response?.thumbnail?.thumbnails,
        title: response.title.runs[0].text,
        description,
        channel,
        length: response.lengthText?.simpleText,
        views: viewsCount,
        publishedAt: isLive ? response?.dateText?.simpleText : response?.publishedTimeText?.simpleText,
        isLive,
        badges,
    };

    return result;

}

/**
 * Parse Short Video
 * @param {*} response 
 * @returns 
 */
function parseShortVideo(results) {

    try {
        const shortResponse = results.contents
            .map((z) => z.richItemRenderer)
            .map((y) => y.content.reelItemRenderer);

        const shorts = shortResponse.map((json) => ({
            id: json.videoId,
            type: "reel",
            thumbnail: json.thumbnail.thumbnails[0],
            title: json.headline.simpleText,
        }));

        return shorts;

    } catch (error) {
        return {};
    }
}

/**
 * 
 */
function parseChannelRender(response) {

    const channelUrl = response.shortBylineText.runs[0].navigationEndpoint.commandMetadata.webCommandMetadata.url;

    const channel = {
        id: channelUrl ? channelUrl?.replace('/', '') : '',
        type: "channel",
        title: response.title.simpleText,
        url: channelUrl ? channelUrl?.replace('/@', '/channel/') : '',
        avatar: response.thumbnail.thumbnails,
        description: response.descriptionSnippet.runs.map((x) => x.text).join(''),
        subscriber: response.videoCountText.simpleText,
    };

    return channel;
}

function parseTrending(response = []) {

    const items = [];

    if (response.expandedShelfContentsRenderer) {
        response.expandedShelfContentsRenderer.items.map((x) => {
            if (x.videoRenderer) {
                items.push(parseVideoRender(x.videoRenderer));
            } else {
                return [];
            }
        })
    }


    return items;

}

function parseShopping(response) {

}

function parseMusic(response) {

}


function parseMovies(response) {

}


function parseLive(response) {

}

function parseGaming(response) {

}


function parseNews(response) {

}


function parseSports(response) {

}

function parseLearning(response) {

}


function parseFashion(response) {

}