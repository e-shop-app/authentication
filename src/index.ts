import "dotenv/config";
import colors from "colors";
import { config } from "./environment";
import app from "./app";

import { start } from "./events";

start();

app.listen(config.port);
console.log(colors.bgYellow.black.bold(config.startMessage!));
