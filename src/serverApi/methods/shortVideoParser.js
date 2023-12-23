export default function shortVideoParser(json) {

    if(!json?.videoId) {
        return {};
    }

    return {
        id: json.videoId,
        type: "reel",
        thumbnails: json.thumbnail.thumbnails,
        title: json.headline.simpleText,
    }
}
