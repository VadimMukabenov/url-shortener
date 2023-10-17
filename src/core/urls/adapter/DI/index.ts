import RedirectUrlService from "../../application/services/RedirectUrlService";
import SaveUrlService from "../../application/services/SaveUrlService"
import RedirectUrlController from "../in/web/RedirectUrlController";
import SaveUrlController from "../in/web/SaveUrlController"
import UrlPersistanceAdapter from "../out/persistance/UrlPersistanceAdapter";

interface Controllers {
    SaveUrlController: SaveUrlController;
    RedirectUrlController: RedirectUrlController;
}

interface Services {
    SaveUrlService: SaveUrlService,
    RedirectUrlService: RedirectUrlService,
}

interface Repository {
    UrlPersistanceAdapter: UrlPersistanceAdapter,
}

export interface UrlAdapters {
    controllers: Controllers;
    services: Services;
    repository: Repository;
}

export const buildAdapters = () => {
    const urlPersistanceAdapter = new UrlPersistanceAdapter();
    
    // saveUrl
    const saveUrlService = new SaveUrlService(urlPersistanceAdapter);
    const saveUrlController = new SaveUrlController(saveUrlService);

    // redirectUrl
    const redirectUrlService = new RedirectUrlService(urlPersistanceAdapter);
    const redirectUrlController = new RedirectUrlController(redirectUrlService);

    return {
        controllers: {
            SaveUrlController: saveUrlController,
            RedirectUrlController: redirectUrlController,
        },
        services: {
            SaveUrlService: saveUrlService,
            RedirectUrlService: redirectUrlService,
        },
        repository: {
            UrlPersistanceAdapter: urlPersistanceAdapter,
        }
    }
}

