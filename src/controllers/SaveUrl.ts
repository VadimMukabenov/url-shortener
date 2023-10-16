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
        const longUrl = req.body.longUrl as string;

        const urlId = new Date().getTime(); // аналог nanoid и прочим. 
        // Плюсы: дает уникальное значение, не требует дополнительных библиотек
        // Минусы: есть некоторая угроза безопасности, т.к можно предугадать время
        if (validateUrl(longUrl)) {
            try {
                let url = await Url.findOne({ longUrl });
                let shortUrl = '';
            if (url) {
                shortUrl = this.getShortUrl(url.shortUrl); 
                res.send({ data: { short_url: shortUrl }});
            } else {
                shortUrl = base62.encode(urlId);

                url = new Url({
                    longUrl,
                    shortUrl,
                    urlId,
                });

                await url.save();
                res.send({ 
                    data: { 
                        short_url: this.getShortUrl(shortUrl)
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

    getShortUrl(decodedString: string) {
        const { BASE } = this.config;
        return `${BASE}/${decodedString}`;
    }
}

export default new SaveUrlController();
