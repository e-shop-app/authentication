require("dotenv").config();

import { config } from "./environment";
import app from "./app";

app.listen(config.port);
console.log(config.startMessage);
