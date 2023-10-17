import { UrlRepository } from "../../../application/port/out/UrlRepository";
import { UrlModel } from "../../../domain/UrlModel";
import UrlEntity from "./entities/Url";

class UrlPersistanceAdapter implements UrlRepository {
    async create(url: UrlModel): Promise<void> {
        const urlEntity = new UrlEntity(url);
        await urlEntity.save();
    }
    async findByParams(params: Partial<UrlModel>): Promise<UrlModel> {
        const urlEntity = await UrlEntity.findOne(params);

        return new UrlModel(urlEntity);
    }
}

export default UrlPersistanceAdapter;
