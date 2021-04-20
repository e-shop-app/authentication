import logger from "winston";
import * as Amqp from "amqp-ts-async";
import colors from "colors";
import { config } from "../../environment";
import { authController } from "../../controllers";

const exchangeName = "USER_ADDED";
const queueName = "";
const connection = new Amqp.Connection(config.messageQ);
const exchange = connection.declareExchange(exchangeName, "auth", {
  durable: true,
});
const queue = connection.declareQueue(queueName, { exclusive: true });

queue.bind(exchange);

export const start = () => {
  try {
    queue.activateConsumer(authController.add);
  } catch (error) {
    logger.error(
      colors.bgWhite.green.bold(
        `Error listening to ${exchangeName}, ${queueName}: ${error}`
      )
    );
  }
};
