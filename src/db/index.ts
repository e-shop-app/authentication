import Koa, { DefaultState, DefaultContext } from "koa";
import { Connection, getConnectionManager } from "typeorm";
import colors from "colors";
import { config } from "../environment";

export const connectDB = async (
  app: Koa<DefaultState, DefaultContext>
): Promise<void> => {
  const { connectedMessage, failedConnection, url } = config.db;

  const connection: Connection = getConnectionManager().create({
    type: "postgres",
    url,
  });

  await connection
    .connect()
    .then(() => console.log(colors.bgYellow.black.bold(connectedMessage)))
    .catch(() => console.log(colors.bgRed.black.bold(failedConnection)));

  app.context.db = connection;
};
