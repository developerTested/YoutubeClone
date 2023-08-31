export default function channelParser(data) {
    const json = data;

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

    return {
        id: json.navigationEndpoint.commandMetadata.webCommandMetadata.url?.replace('/@', ''),
        title: json.title.simpleText,
        type: "channel",
        description: json?.descriptionSnippet?.runs?.map((x) => x.text).join(''),
        avatar: json.thumbnail.thumbnails,
        subscriber: json.subscriberCountText?.simpleText,
        videos: json.videoCountText?.runs?.map((x) => x.text).join(''),
        verified,
        artist,
    }
}
