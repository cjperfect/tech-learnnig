import { Module } from '@nestjs/common';
import { AiHotspotController } from './ai-hotspot.controller';
import { AiHotspotService } from './ai-hotspot.service';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AiHotspotController],
  providers: [AiHotspotService],
  exports: [AiHotspotService],
})
export class AiHotspotModule {}
