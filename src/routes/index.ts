import Router from "koa-router";
import { config } from "../environment";

const api = "auth";

const router = new Router();

// /api/auth
router.prefix(`/${config.baseAPIRoute}/${api}`);
router.post("/");

export default router;
