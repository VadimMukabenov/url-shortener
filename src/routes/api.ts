import SaveUrl from "../controllers/SaveUrl";
import RedirectUrl from "../controllers/RedirectUrl";
import { Router } from "../my-express-clone";

const router = new Router();

router.post('/v1/data/shorten', (req, res) => {
    SaveUrl.run(req, res);
});

router.get('/:shortUrl', (req, res) => {
    RedirectUrl.run(req, res);
});

export default router;
