import Router from "koa-router";
import { authController } from "../controllers";
import { config } from "../environment";

const api = "authenticate";

const router = new Router();

// /api/auth
router.prefix(`/${config.baseAPIRoute}/${api}`);

router.post("/", authController.authenticate);

export default router;
