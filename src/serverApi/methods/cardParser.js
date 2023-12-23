export default function cardParser(response) {

    if (response?.videoCardRenderer) {
        const json = response?.videoCardRenderer;

        if (!json?.videoId) {
            return {};
        }

        let artist = false;
        if (
            json?.ownerBadges &&
            json?.ownerBadges.length > 0 &&
            json?.ownerBadges[0]?.metadataBadgeRenderer &&
            ["OFFICIAL_ARTIST_BADGE", "BADGE_STYLE_TYPE_VERIFIED_ARTIST"]
                .includes(json?.ownerBadges[0]?.metadataBadgeRenderer?.style)
        ) {
            artist = true;
        }

        let verified = false;
        if (
            json?.ownerBadges &&
            json?.ownerBadges.length > 0 &&
            json?.ownerBadges[0]?.metadataBadgeRenderer &&
            json?.ownerBadges[0]?.metadataBadgeRenderer?.style ===
            "BADGE_STYLE_TYPE_VERIFIED"
        ) {
            verified = true;
        }

        const channelGet = json?.bylineText?.runs;
        const channelUrl = channelGet[0]?.navigationEndpoint?.commandMetadata?.webCommandMetadata?.url;

        const channel = {
            id: channelUrl ? channelUrl?.replace('/@', '') : '',
            title: channelGet.map((x) => x.text).join(''),
            url: channelUrl ? channelUrl?.replace('/@', '/channel/') : '',
            verified,
            artist,
        };

        return {
            id: json.videoId,
            type: "video",
            title: json.title?.runs?.map((x) => x.text).join(''),
            thumbnails: json.thumbnail?.thumbnails,
            views: json?.metadataText?.simpleText,
            length: json?.lengthText?.simpleText,
            channel,
        };

    } else if (response?.videoCardRenderer) {
        const json = response?.videoCardRenderer;

        if (!json?.videoId) {
            return {};
        }

        let artist = false;
        if (
            json?.ownerBadges &&
            json?.ownerBadges.length > 0 &&
            json?.ownerBadges[0]?.metadataBadgeRenderer &&
            ["OFFICIAL_ARTIST_BADGE", "BADGE_STYLE_TYPE_VERIFIED_ARTIST"]
                .includes(json?.ownerBadges[0]?.metadataBadgeRenderer?.style)
        ) {
            artist = true;
        }

        let verified = false;
        if (
            json?.ownerBadges &&
            json?.ownerBadges.length > 0 &&
            json?.ownerBadges[0]?.metadataBadgeRenderer &&
            json?.ownerBadges[0]?.metadataBadgeRenderer?.style ===
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
    } else if (response?.gridVideoRenderer) {

        const json = response.gridVideoRenderer;
        
        if (!json?.videoId) {
            return {};
        }

        let artist = false;
        if (
            json?.ownerBadges &&
            json?.ownerBadges.length > 0 &&
            json?.ownerBadges[0]?.metadataBadgeRenderer &&
            ["OFFICIAL_ARTIST_BADGE", "BADGE_STYLE_TYPE_VERIFIED_ARTIST"]
                .includes(json?.ownerBadges[0]?.metadataBadgeRenderer?.style)
        ) {
            artist = true;
        }

        let verified = false;
        if (
            json?.ownerBadges &&
            json?.ownerBadges.length > 0 &&
            json?.ownerBadges[0]?.metadataBadgeRenderer &&
            json?.ownerBadges[0]?.metadataBadgeRenderer?.style ===
            "BADGE_STYLE_TYPE_VERIFIED"
        ) {
            verified = true;
        }

        const title = json?.title?.simpleText || json?.title?.runs?.map((x) => x.text).join('')

        const channelGet = json?.shortBylineText?.runs;
        const channelUrl = channelGet[0]?.navigationEndpoint?.commandMetadata?.webCommandMetadata?.url;

        const channel = {
            id: channelUrl ? channelUrl?.replace('/@', '') : '',
            title: channelGet.map((x) => x.text).join(''),
            url: channelUrl ? channelUrl?.replace('/@', '/channel/') : '',
            avatar: json?.channelThumbnail?.thumbnails[0],
            verified,
            artist,
        };

        return {
            id: json.videoId,
            type: "video",
            title,
            channel,
            views: json?.shortViewCountText?.simpleText,
            publishedAt: json?.publishedTimeText?.simpleText,
            thumbnails: json?.thumbnail?.thumbnails,
        };

    } else if(response?.gridPlaylistRenderer) {
        const json = response.gridPlaylistRenderer;

        const channelGet = json?.shortBylineText?.runs;
        const channelUrl = channelGet[0]?.navigationEndpoint?.commandMetadata?.webCommandMetadata?.url;

        return {
            id: json.playlistId,
            type: "playlist",
            title: json?.title?.runs?.map((x) => x.text).join(''),
            channel: {
                id: channelUrl ? channelUrl?.replace('/channel/', '') : '',
                title: channelGet?.map((x) => x.text).join(''),
                url: channelUrl ? channelUrl?.replace('/@', '/channel/') : '',
            },
            length: json.videoCount,
            thumbnail: json?.thumbnail?.thumbnails[0],
            publishedAt: json?.publishedTimeText?.simpleText,
            videos: json?.videoCountShortText?.simpleText,
            videoCount: json?.videoCountText?.runs?.map((x) => x.text).join(''),
        }

    }
}
