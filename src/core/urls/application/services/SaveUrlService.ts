import { SaveUrlUseCase } from "../port/in/SaveUrlUseCase";

import { getConfig, Config } from "../../../../config";
import * as base62 from "base62/lib/ascii";
import { UrlModel } from "../../domain/UrlModel";
import { UrlRepository } from "../port/out/UrlRepository";

class SaveUrlService implements SaveUrlUseCase {
    private readonly config: Config;
    private readonly _urlRepository: UrlRepository;
    constructor(urlRepository: UrlRepository) {
        this.config = getConfig();
        this._urlRepository = urlRepository;
    }

    async run(longUrl: string, customUrl?: string): Promise<{ shortUrl: string; }> {
        const urlId = new Date().getTime(); // аналог nanoid и прочим. 
        // Плюсы: дает уникальное значение, не требует дополнительных библиотек
        // Минусы: есть некоторая угроза безопасности, т.к можно предугадать время
        try {
            let url = await this._urlRepository.findByParams({ longUrl });
            let shortUrl = '';
            
            if (url) {
                shortUrl = this.getShortUrlWithDomain(url.shortUrl); 
                return { shortUrl };
            } 
            else {
                if (customUrl) {
                    const result = await this._urlRepository.findByParams({ shortUrl: customUrl });
                    
                    if (result) {
                        throw new Error('Это кастомный URL уже занят');
                    }

                    shortUrl = customUrl;
                } 
                else {
                    shortUrl = base62.encode(urlId);
                }

                url = new UrlModel({
                    longUrl,
                    shortUrl,
                    urlId: String(urlId),
                });

                await this._urlRepository.create(url);

                return { 
                    shortUrl: this.getShortUrlWithDomain(shortUrl)
                };
            }
        } catch (err) {
            console.log(err);
            throw new Error();
        }
    }

    private getShortUrlWithDomain(decodedString: string) {
        const { BASE: domain } = this.config;
        return `${domain}/${decodedString}`;
    }
}

export default SaveUrlService;
