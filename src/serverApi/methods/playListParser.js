export default function playListParser(data) {
    const json = data.gridPlaylistRenderer;

    return {
        id: json.playlistId,
        type: "playlist",
        thumbnails: json.thumbnail.thumbnails,
        title: json.title.runs[0].text,
        publishedAt: json.publishedTimeText?.simpleText,
        length: json.videoCountText.runs.map((x) => x.text).join(''),
        videos: json.videoCountText.runs.map((x) => x.text).join(''),
        videoCount: json?.videoCountShortText?.simpleText,
        isLive: false
    }

}