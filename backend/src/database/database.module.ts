import { Module, Global } from '@nestjs/common';
import { DatabaseInitService } from './database.init.service';
import { PrismaService } from '../common/services/prisma.service';

@Global()
@Module({
  providers: [DatabaseInitService, PrismaService],
  exports: [DatabaseInitService, PrismaService],
})
export class DatabaseModule {}
