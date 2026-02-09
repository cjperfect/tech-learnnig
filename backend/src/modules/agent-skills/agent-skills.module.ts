import { Module } from '@nestjs/common';
import { AgentSkillsController } from './agent-skills.controller';
import { AgentSkillsService } from './agent-skills.service';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AgentSkillsController],
  providers: [AgentSkillsService],
  exports: [AgentSkillsService],
})
export class AgentSkillsModule {}
