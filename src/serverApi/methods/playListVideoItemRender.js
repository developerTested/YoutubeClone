export default function playListVideoItemRender(json) {

    const channelUrl = json?.shortBylineText?.runs[0].navigationEndpoint.commandMetadata.webCommandMetadata.url;

    const response = {
        id: json.videoId,
        type: "video",
        thumbnails: json?.thumbnail.thumbnails,
        title: json.title?.runs.map((x) => x.text).join(''),
        channel: {
            title: json?.shortBylineText?.runs.map((x) => x.text).join(''),
            url: channelUrl ? channelUrl?.replace('/@', '/channel/') : '',
        },
        publishedAt: json?.videoInfo?.runs.length ? json?.videoInfo?.runs[json?.videoInfo?.runs.length - 1]?.text : '',
        views: json?.videoInfo?.runs.length ? json?.videoInfo?.runs[0]?.text : '',
        length: json?.lengthText?.simpleText,
        videoIndex: json?.index?.simpleText || null,
    }

    if(!response.videoIndex) {
        delete(response.videoIndex);
    }

    return response;
}
