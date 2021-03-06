import "dotenv/config";
import Koa, { DefaultContext, DefaultState, Next } from "koa";
import logger from "koa-logger";
import helmet from "koa-helmet";
import bodyparser from "koa-bodyparser";
import colors from "colors";
import { connectDB } from "./db";
import authRouter from "./routes";
import { config } from "./environment";

const main = async (): Promise<void> => {
  const app: Koa<DefaultState, DefaultContext> = new Koa();

  await connectDB(app);

  app.use(logger());
  app.use(bodyparser());
  app.use(helmet());

  app.use(authRouter.routes()).use(authRouter.allowedMethods({ throw: true }));

  app.listen(config.port);
  console.log(colors.bgYellow.black.bold(config.startMessage!));
};

main();
