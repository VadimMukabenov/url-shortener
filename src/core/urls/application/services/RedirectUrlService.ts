import { RedirectUrlUseCase } from "../port/in/RedirectUrlUseCase";
import { UrlModel } from "../../domain/UrlModel";
import { UrlRepository } from "../port/out/UrlRepository";

class RedirectUrlService implements RedirectUrlUseCase {
    _urlRepository: UrlRepository;
    constructor(urlRepository: UrlRepository) {
        this._urlRepository = urlRepository;
    }

    async run(shortUrl: string): Promise<UrlModel> {
        return this._urlRepository.findByParams({ shortUrl });
    }
}

export default RedirectUrlService;
