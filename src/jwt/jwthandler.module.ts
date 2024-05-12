import { Module } from '@nestjs/common';
import { JwtHandlerService } from './jwthandler.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({
    secret: 'ComplicatedSecretKey',
    signOptions: { expiresIn: '1d' },
  })],
  providers: [JwtHandlerService],
  exports: [JwtHandlerService],
})
export class JwtHandlerModule {}
