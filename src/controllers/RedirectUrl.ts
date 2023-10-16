import { Url } from "../db/models";
import { IRequest, IResponse } from "../my-express-clone/_types";

class RedirectUrlController {
    async run(req: IRequest, res: IResponse) {
        try {
            const url = await Url.findOne({ shortUrl: req.params.shortUrl });
            if (url) {
                // для аналитики
                // в будущем здесь можно добавить и обновлять счетчик
                // кликов (переходов) по ссылке
                return res.redirect(url.longUrl);
            } else {
                res.send({ data: 'Not found', status: 404 });
            }
        } catch (err) {
            console.log(err);
            res.send({ data: 'Server Error', status: 500 });
        }
    }
}

export default new RedirectUrlController();
