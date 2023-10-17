import * as base62 from "base62/lib/ascii";
import { Url } from "../db/models";
import { IRequest, IResponse } from "../my-express-clone/_types";
import { validateUrl } from "../utils/validateUrl";
import { getConfig, Config } from "../config";

class SaveUrlController {
    config: Config;
    constructor() {
        this.config = getConfig();
    }

    async run(req: IRequest, res: IResponse) {
        // TODO. Add validation
        const longUrl = req.body.longUrl as string;
        const customUrl = req.body.custom_url as string;

        const urlId = new Date().getTime(); // аналог nanoid и прочим. 
        // Плюсы: дает уникальное значение, не требует дополнительных библиотек
        // Минусы: есть некоторая угроза безопасности, т.к можно предугадать время
        if (validateUrl(longUrl)) {
            try {
                let url = await Url.findOne({ longUrl });
                let shortUrl = '';
            if (url) {
                shortUrl = this.getShortUrlWithDomain(url.shortUrl); 
                res.send({ data: { short_url: shortUrl }});
            } else {
                if (customUrl) {
                    const result = await Url.findOne({ shortUrl: customUrl });
                    
                    if (result) {
                        return res.send({ data: 'Это кастомный URL уже занят', status: 500 });
                    }

                    shortUrl = customUrl;
                } else {
                    shortUrl = base62.encode(urlId);
                }
                

                url = new Url({
                    longUrl,
                    shortUrl,
                    urlId,
                });

                await url.save();
                res.send({ 
                    data: { 
                        short_url: this.getShortUrlWithDomain(shortUrl)
                    } 
                });
            }
            } catch (err) {
                console.log(err);
                res.send({ data: 'Server Error', status: 500 });
            }
        } else {
            res.send({ data: 'Invalid Original Url', status: 400 });
        }
    }

    getShortUrlWithDomain(decodedString: string) {
        const { BASE: domain } = this.config;
        return `${domain}/${decodedString}`;
    }
}

export default new SaveUrlController();
