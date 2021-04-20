import { Context } from "koa";
import axios from "axios";
import logger from "winston";
import { Message } from "amqp-ts-async";
import colors from "colors";
import { User } from "../entities";
import { AuthService } from "../services";
import { config } from "../environment";
import UserInfo from "../@types/userinfo";

export const authController = {
  authenticate: async (ctx: Context): Promise<void> => {
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

        if (!user) {
          ctx.throw(404, "User not found!");
        }

        ctx.body = user;
      } else {
        ctx.throw(403, "Unauthorized access!");
      }
    } catch (error) {
      ctx.throw(500, "We've encounted an error. Please try again later!");
    }
  },

  add: async (msg: Message): Promise<void> => {
    let user: UserInfo;
    try {
      user = JSON.parse(msg.content.toString());
      await AuthService.register(user);

      logger.info(
        colors.bgWhite.green.bold(`User successfully created - ${user.email}`)
      );
    } catch (error) {
      logger.error(colors.bgRed.black.bold(`Error creating user - ${error}`));
    }
  },
};
