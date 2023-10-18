import { getConfig } from "./config";
import { buildAdapters } from "./core/urls/adapter/DI";
import { connectDB } from "./db";
// import SaveUrl from "./controllers/SaveUrl";

import { App, middlewares } from "./my-express-clone";
const { bodyParser, parseJSON } = middlewares;

import Routing from "./routes/api";

// async function buildApp() {
// }

async function start() {
    const config = getConfig();
    await connectDB(config.MONGODB_URI);

    const PORT = config.APP_PORT || 3000;
    const app = new App();

    const adapters = buildAdapters();
    
    const router = Routing(adapters);

    app.use(parseJSON);
    app.use(bodyParser);

    app.addRouter(router);

    app.listen(PORT, () =>{
        console.log(`Server is running on port new ${PORT}`);
    });
}

start();
