import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ServiceBusClient, ServiceBusMessage } from '@azure/service-bus';
import { randomUUID } from 'crypto';

@Injectable()
export class ServiceBusPublisher implements OnModuleDestroy {
  private readonly client = new ServiceBusClient(
    process.env.ASB_CONNECTION_SENDER!,
  );

  async publish(
    queueName: string,
    type: string,
    payload: unknown,
    correlationId?: string,
  ) {
    const sender = this.client.createSender(queueName);
    const message: ServiceBusMessage = {
      body: payload,
      contentType: 'application/json',
      subject: type,
      messageId: randomUUID(),
      correlationId,
      applicationProperties: { type },
    };
    try {
      await sender.sendMessages(message);
    } finally {
      await sender.close();
    }
  }

  async onModuleDestroy() {
    await this.client.close();
  }
}
