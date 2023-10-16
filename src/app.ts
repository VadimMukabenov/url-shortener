import { getConfig } from "./config";
import { connectDB } from "./db";
// import SaveUrl from "./controllers/SaveUrl";

import { App, middlewares } from "./my-express-clone";
const { bodyParser, parseJSON } = middlewares;

import router from "./routes/api";

async function start() {
    const config = getConfig();
    await connectDB(config.MONGODB_URI);

    const PORT = config.APP_PORT || 3000;
    const app = new App();

    app.use(parseJSON);
    app.use(bodyParser);

    app.addRouter(router);

    app.listen(PORT, () =>{
        console.log(`Server is running on port new ${PORT}`);
    });
}

start();
