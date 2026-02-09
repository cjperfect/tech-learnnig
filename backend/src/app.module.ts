import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { ArticlesModule } from './modules/articles/articles.module';
import { PromptsModule } from './modules/prompts/prompts.module';
import { McpsModule } from './modules/mcps/mcps.module';
import { AgentSkillsModule } from './modules/agent-skills/agent-skills.module';
import { AiHotspotModule } from './modules/ai-hotspot/ai-hotspot.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([{
      ttl: 60000, // 时间窗口: 60秒
      limit: 100, // 限制: 100次请求
    }]),
    AuthModule,
    ArticlesModule,
    PromptsModule,
    McpsModule,
    AgentSkillsModule,
    AiHotspotModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
