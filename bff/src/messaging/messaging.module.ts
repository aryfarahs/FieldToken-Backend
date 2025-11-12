import { Module, Global } from '@nestjs/common';
import { ServiceBusPublisher } from './service-bus.publisher';

@Global() // opcional: deixa disponível em toda a app sem precisar importar em cada módulo
@Module({
  providers: [ServiceBusPublisher],
  exports: [ServiceBusPublisher],
})
export class MessagingModule {}
