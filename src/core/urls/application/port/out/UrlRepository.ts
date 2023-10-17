import { UrlModel } from "../../../domain/UrlModel";

export interface UrlRepository {
    create(url: UrlModel): Promise<void>;

    findByParams(params: Partial<UrlModel>): Promise<UrlModel>;
}
