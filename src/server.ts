import app from "./app.js";

let server;
const port = 5000;

const bootstrap = async () => {
  server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

bootstrap();



/**
 * server---- server starting, closing , error handling server related things
 * app file ---- all routes, middlewares, route related errors handeling etc
 * app floder---- all bussiness logic handling like create , update, get , delete, mongo db related things
*/