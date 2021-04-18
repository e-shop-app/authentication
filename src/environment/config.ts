interface IConfig {
  name: string;
  baseAPIRoute: string;
  port: number;
  messageQ: string;
  environment: string;
  db: {
    uri: string;
  };
  startMessage?: string;
}

const config: IConfig = {
  name: "Auth Service",
  baseAPIRoute: "api",
  port: parseInt(process.env.PORT!) || 8080,
  messageQ: process.env.MESSAGEQ || "amqp://rabbitmq",
  environment: process.env.NODE_ENV || "development",
  db: {
    uri: process.env.DB_URI || "",
  },
};

config.startMessage = `${config.name} is running on port:[${config.port}]`;

export default config;
