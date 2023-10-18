import { IRequest, IResponse } from "../../../../../my-express-clone/_types";
import RedirectUrlSchema from "./validation/schemas/redirectUrlSchema";
import validateSchema from "../../../../../libs/validation";
import { RedirectUrlUseCase } from "../../../application/port/in/RedirectUrlUseCase";

class RedirectUrlController {
    private readonly _redirectUrlService: RedirectUrlUseCase;

    constructor(redirectUrlService: RedirectUrlUseCase) {
        this._redirectUrlService = redirectUrlService;
    }

    async run(req: IRequest, res: IResponse) {
        try {
            const shortUrl = req.params.shortUrl as string;
            const isValid = await validateSchema(shortUrl, RedirectUrlSchema);

            if (isValid) {
                const url = await this._redirectUrlService.run(shortUrl);
                if (url) {
                    // для аналитики
                    // в будущем здесь можно добавить и обновлять счетчик
                    // кликов (переходов) по ссылке
                    return res.redirect(url.longUrl);
                } else {
                    res.send({ data: 'Not found', status: 404 });
                }
            }
        } catch (err) {
            console.log(err);
            if(err instanceof Error) {
                res.send({ data: err.message, status: 500 });
            }
        }
    }
}

export default RedirectUrlController;
