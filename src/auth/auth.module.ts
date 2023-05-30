import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SharedModule } from 'src/shared/shared.module';
import { JwtStategy } from './jwt.stragery';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStategy],
  imports: [SharedModule]
})
export class AuthModule {}
