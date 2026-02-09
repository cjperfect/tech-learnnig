import { Module } from '@nestjs/common';
import { McpsController } from './mcps.controller';
import { McpsService } from './mcps.service';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [McpsController],
  providers: [McpsService],
  exports: [McpsService],
})
export class McpsModule {}
