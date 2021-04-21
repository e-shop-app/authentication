import { Context, Next } from "koa";
import axios from "axios";
import { User } from "../entities";
import { AuthService, publishToQueue } from "../services";
import { config } from "../environment";
import UserInfo from "../@types/userinfo";

export const authController = {
  authenticate: async (ctx: Context, next: Next): Promise<void> => {
    try {
      const token:
        | string
        | undefined = ctx.request.headers.authorization?.slice(7);

      if (token) {
        ctx.cookies.set("_token", token, {
          httpOnly: true,
          sameSite: true,
          secure: config.environment === "development" ? true : false,
        });

        axios.defaults.headers["content-type"] = "application/json";
        axios.defaults.headers["authorization"] = `Bearer ${token}`;

        const { data }: { data: UserInfo } = await axios.get(
          `${config.issuer}/userinfo`
        );

        data.sub = data.sub.slice(6);

        const user: User | null = await AuthService.login(data.sub);

        if (user) {
          ctx.body = user;
          await next();
        } else {
          const user: User = await AuthService.register(data);
          await next();

          ctx.body = user;
        }
      } else {
        ctx.throw(403, "Unauthorized access!");
      }
    } catch (error) {
      ctx.throw(500, "We've encounted an error. Please try again later!");
    }
  },

  add: async (ctx: Context, next: Next): Promise<void> => {
    try {
      let {
        queueName,
        payload,
      }: { queueName: string; payload: Buffer } = ctx.request.body;

      await publishToQueue(queueName, payload);

      ctx.body = { "message-sent": true };

      await next();
    } catch (error) {
      console.log(error);

      ctx.throw(500, "We've encounted an error. Please try again later!");
    }
  },
};
