import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { HashModule } from 'src/hash/hash.module';

@Module({
  imports: [UsersModule, HashModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
