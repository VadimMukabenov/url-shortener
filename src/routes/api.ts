import { Router } from "../my-express-clone";

import { UrlAdapters } from  "../core/urls/adapter/DI";

export function Routing(input: Pick<UrlAdapters, 'controllers'>) {
    const router = new Router();
    const { SaveUrlController, RedirectUrlController } = input.controllers;

    router.post('/v1/data/shorten', async (req, res) => {
        await SaveUrlController.run(req, res);
    });
    
    router.get('/:shortUrl', async (req, res) => {
        await RedirectUrlController.run(req, res);
    });

    return router;
}
