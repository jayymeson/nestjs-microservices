import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @RabbitSubscribe({
    exchange: 'amq.direct',
    routingKey: 'microservice-2',
    queue: 'microservice-2-queue',
  })
  public async pubSubHandler(data: any) {
    this.appService.consumeMessage(data.message);
    console.log(data);
  }
}
