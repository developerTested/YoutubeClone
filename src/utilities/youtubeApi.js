import axios from "axios";

const config = {
    baseURL: import.meta.env.VITE_YOUTUBE_API_URL ?? '/api',
    timeout: 60 * 1000,
};

const YoutubeApi = axios.create(config);

YoutubeApi.interceptors.response.use(
    function (response) {
        // Do something with response data
        return response.data;
    },
    function (err) {
        Promise.reject(err);
    }
);

export default YoutubeApi;