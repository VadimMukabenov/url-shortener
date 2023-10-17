interface UrlModelInput {
    urlId: string;
    shortUrl: string;
    longUrl: string;
}

export class UrlModel {
    private readonly _urlId: string;
    private readonly _shortUrl: string;
    private readonly _longUrl: string;
    constructor(input: UrlModelInput) {
        this._urlId = input.urlId;
        this._shortUrl = input.shortUrl;
        this._longUrl = input.longUrl;
    }

    get id() {
        return this._urlId;
    }

    get shortUrl() {
        return this._shortUrl;
    }

    get longUrl() {
        return this._longUrl;
    }
}
