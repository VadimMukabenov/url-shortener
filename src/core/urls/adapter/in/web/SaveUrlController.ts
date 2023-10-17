import { IRequest, IResponse } from "../../../../../my-express-clone/_types";
import { SaveUrlUseCase } from "../../../application/port/in/SaveUrlUseCase";
import { validateUrl } from "../../../../../utils/validateUrl";
import SaveUrlSchema from "./validation/schemas/saveUrlSchema";
import validateSchema from "../../../../../libs/validation";

class SaveUrlController {
    private readonly _saveUrlService: SaveUrlUseCase;

    constructor(saveUrlService: SaveUrlUseCase) {
        this._saveUrlService = saveUrlService;
    }
    
    async run(req: IRequest, res: IResponse) {
        const { long_url: longUrl, custom_url: customUrl } = req.body as { long_url: string, custom_url: string };
        const isValid = await validateSchema({ 
            long_url: longUrl, 
            custom_url: customUrl
        }, SaveUrlSchema);

        if (!validateUrl(longUrl)) {
            return res.send({ data: 'Invalid Original Url', status: 400 });
        }

        if (isValid) {
            try {
                const { shortUrl } = await this._saveUrlService.run(longUrl, customUrl);
                res.send({ data: { short_url: shortUrl }});
            } catch (err: unknown) {
                if(err instanceof Error) {
                    res.send({ data: err.message, status: 500 });
                }
                
                // res.send({ data: 'Это кастомный URL уже занят', status: 500 });
            }
        }
    }

    
}

export default SaveUrlController;
