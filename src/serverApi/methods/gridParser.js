export default function gridParser(data, channel) {

    const json = data.gridVideoRenderer;

    return {
        id: json.videoId,
        type: "video",
        title: json?.title?.simpleText,
        channel,
        length: json?.thumbnailOverlays[0]?.thumbnailOverlayTimeStatusRenderer?.text?.simpleText,
        publishedAt: json?.publishedTimeText?.simpleText,
        views: json?.shortViewCountText?.simpleText,
        thumbnails: json?.thumbnail?.thumbnails,
    };
}
