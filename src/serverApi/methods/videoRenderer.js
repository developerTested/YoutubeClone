export default function videoRenderer(response) {

    if (!response?.videoId) {
        return {};
    }

    try {

        let isLive = false;
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
            badges = badges.filter((x) => x.toLowerCase() !== 'live');
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
            title: response.title.runs[0].text,
            description,
            channel,
            length: response.lengthText?.simpleText,
            views: viewsCount,
            publishedAt: isLive ? response?.dateText?.simpleText : response?.publishedTimeText?.simpleText,
            thumbnails: response?.thumbnail?.thumbnails,
            isLive,
            badges,
        };

        return result;
    } catch (error) {
        return error;
    }
}