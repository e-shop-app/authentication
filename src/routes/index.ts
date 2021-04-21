import Router from "koa-router";
import { authController } from "../controllers";
import { config } from "../environment";

const api = "authenticate";
const queue = "msg";

const router = new Router();

// /api/auth
router.prefix(`/${config.baseAPIRoute}/`);

router.post(`/${api}`, authController.authenticate);

router.post(`/${queue}`, authController.add);

export default router;
