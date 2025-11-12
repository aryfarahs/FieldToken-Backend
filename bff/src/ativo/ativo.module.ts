import { Module } from '@nestjs/common';
import { AtivoService } from './ativo.service';
import { AtivoController } from './ativo.controller';
import { HttpModule } from '@nestjs/axios';
import { MessagingModule } from 'src/messaging/messaging.module';

@Module({
  imports: [HttpModule, MessagingModule],
  controllers: [AtivoController],
  providers: [AtivoService],
})
export class AtivoModule {}
