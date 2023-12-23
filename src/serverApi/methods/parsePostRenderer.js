export default function parsePostRenderer(json) {

    if(!json?.postId) {
        return {};
    }


    const channelUrl = json.authorEndpoint.commandMetadata.webCommandMetadata.url;
    const channelAvatar = json.authorThumbnail.thumbnails;

    const channel = {
        id: channelUrl ? channelUrl?.replace('/@', '') : '',
        title: json?.authorText?.runs[0]?.text,
        url: channelUrl ? channelUrl?.replace('/@', '/channel/') : '',
        avatar: channelAvatar,
    };

    return {
        id: json.postId,
        type: "post",
        content: json?.contentText?.runs.map((x) => x.text).join('') ?? null,
        publishedAt: json?.publishedTimeText?.runs.map((x) => x.text).join(''),
        thumbnails: json?.backstageAttachment?.backstageImageRenderer?.image.thumbnails,
        channel,
    }
}