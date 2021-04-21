import amqplib, { Channel, Connection } from "amqplib/callback_api";
import { config } from "../environment";

let ch: Channel;

amqplib.connect(
  `${config.messageQ}`,
  (error0: any, connection: Connection): void => {
    if (error0) throw error0;

    connection.createChannel((error1: any, channel: Channel): void => {
      if (error1) throw error1;

      ch = channel;
    });
  }
);

export default async (queueName: string, data: any): Promise<void> => {
  ch?.sendToQueue(queueName, Buffer.from(data));
};

process.on("exit", (_) => {
  ch?.close((err: any) => {
    throw err;
  });

  console.log("Closing rabbitmq channel.");
});
