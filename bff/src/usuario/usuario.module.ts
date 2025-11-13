import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { HttpModule } from '@nestjs/axios';
import { MessagingModule } from 'src/messaging/messaging.module';

@Module({
  imports: [HttpModule, MessagingModule],
  controllers: [UsuarioController],
  providers: [UsuarioService],
})
export class UsuarioModule {}
