import Config from "../@types/config";

const config: Config = {
  name: "AUTH-SERVICE",
  baseAPIRoute: "api",
  port: parseInt(process.env.PORT!),
  messageQ: process.env.MESSAGEQ || "amqp://rabbitmq",
  environment: process.env.NODE_ENV || "development",
  db: {
    url: process.env.DB_URL || "",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT!),
    username: process.env.DB_USERNAME || "",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "",
    connectedMessage: "DB connection success.",
    failedConnection: "DB connection failure.",
  },
  issuer: process.env.ISSUER_BASE_URL || "",
};

config.startMessage = `(${config.name}):running on port:[${config.port}]`;

export default config;
