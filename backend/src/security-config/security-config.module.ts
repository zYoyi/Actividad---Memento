import { Module } from '@nestjs/common';
import { SecurityConfigController } from './controllers/security-config.controller';
import { SecurityConfigService } from './services/security-config.service';

@Module({
  controllers: [SecurityConfigController],
  providers: [SecurityConfigService],
})
export class SecurityConfigModule {}
