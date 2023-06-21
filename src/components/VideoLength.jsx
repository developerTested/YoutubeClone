import moment from "moment";
import React from "react";

export default function VideoLength({ time = 10, text, isLive = false }) {

    const date = moment()
        .startOf("day")
        .seconds(time);

    const duration = time > 3600 ? date.format("hh:mm:ss") : date.format('mm:ss');

    return (
        <>
            <div className="absolute bottom-2 right-2 rounded block text-center text-xs px-1.5 py-1 bg-black text-white">
                {text ? text : duration}
            </div>
        </>

    );
};