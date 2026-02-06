import { Module } from '@nestjs/common';
import { PromptsController } from './prompts.controller';
import { PromptsService } from './prompts.service';
import { PrismaService } from '../../common/services/prisma.service';

@Module({
  controllers: [PromptsController],
  providers: [PromptsService, PrismaService],
  exports: [PromptsService],
})
export class PromptsModule {}
