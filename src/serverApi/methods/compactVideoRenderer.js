export default compactVideoRenderer = (json) => {
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

    let badges = [];
    if (
        compactVideoRendererJson.badges &&
        compactVideoRendererJson.badges.length > 0) {
        badges = compactVideoRendererJson.badges.map((x) => x.metadataBadgeRenderer.label);
        badges = badges.filter((x) => x.toLowerCase() !== 'live');
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

    const viewsCount = isLive ? compactVideoRendererJson.shortViewCountText?.runs?.map((x) => x.text).join('') : compactVideoRendererJson.shortViewCountText?.simpleText;

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
        views: viewsCount,
        publishedAt: compactVideoRendererJson?.publishedTimeText?.simpleText,
        badges,
        isLive,
    };

    return result;
};

