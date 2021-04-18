import koaRouter from "koa-router";
import { config } from "../environment";

const api = "auth";

const router = new koaRouter();

// /api/auth
router.prefix(`/${config.baseAPIRoute}/${api}`);
router.post("/");

export default router;
