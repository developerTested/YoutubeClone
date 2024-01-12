import ViteExpress from "vite-express";
import app from "../netlify/functions/api.js";

const port = process.env.PORT || 3000;

ViteExpress.listen(app, port, () => {
    console.log('Express server listening on port %d in %s mode', port, app.settings.env);
});