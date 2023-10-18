import { UrlModel } from "../../../domain/UrlModel";

export interface RedirectUrlUseCase {
    run(shortUrl: string): Promise<UrlModel>;
}
