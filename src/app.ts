import Koa, { DefaultContext, DefaultState } from "koa";
import logger from "koa-logger";
import helmet from "koa-helmet";
import bodyparser from "koa-bodyparser";
import { connectDB } from "./db";
import authRouter from "./routes";

const app: Koa<DefaultState, DefaultContext> = new Koa();

connectDB(app);

app.use(logger());
app.use(bodyparser());
app.use(helmet());
app.use(authRouter.routes()).use(authRouter.allowedMethods({ throw: true }));

export default app;
