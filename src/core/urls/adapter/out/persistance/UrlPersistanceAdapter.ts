import { UrlRepository } from "../../../application/port/out/UrlRepository";
import { UrlModel } from "../../../domain/UrlModel";
import UrlEntity from "./entities/Url";

class UrlPersistanceAdapter implements UrlRepository {
    async create(url: UrlModel): Promise<void> {
        const urlEntity = new UrlEntity({
            urlId: url.urlId,
            shortUrl: url.shortUrl,
            longUrl: url.longUrl,
        });
        await urlEntity.save();
    }
    async findByParams(params: Partial<UrlModel>): Promise<UrlModel | undefined> {
        const urlEntity = await UrlEntity.findOne(params);

        if (!urlEntity) {
            return;
        }

        return new UrlModel(urlEntity);
    }
}

export default UrlPersistanceAdapter;
