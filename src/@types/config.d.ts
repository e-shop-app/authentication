declare type Config = {
  name: string;
  baseAPIRoute: string;
  port: number;
  messageQ: string;
  environment: string;
  db: {
    url: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    connectedMessage: string;
    failedConnection: string;
  };
  startMessage?: string;
  issuer: string;
};

export default Config;
