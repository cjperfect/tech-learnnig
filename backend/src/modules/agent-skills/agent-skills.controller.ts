import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AgentSkillsService } from './agent-skills.service';
import { CreateAgentSkillDto, QueryAgentSkillsDto, CreateAgentSkillCategoryDto } from './dto/create-agent-skill.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('agent-skills')
@Controller('agent-skills')
export class AgentSkillsController {
  constructor(private readonly agentSkillsService: AgentSkillsService) {}

  // ========== 分类相关 ==========
  @Get('categories')
  @Throttle({ default: { limit: 30, ttl: 60000 } })
  @ApiOperation({ summary: '获取所有分类' })
  @ApiResponse({ status: 200, description: '成功返回分类列表' })
  findCategories() {
    return this.agentSkillsService.findCategories();
  }

  @Post('categories')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @ApiOperation({ summary: '创建分类' })
  @ApiResponse({ status: 201, description: '创建成功' })
  createCategory(@Body() createCategoryDto: CreateAgentSkillCategoryDto) {
    return this.agentSkillsService.createCategory(createCategoryDto);
  }

  @Put('categories/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { limit: 20, ttl: 60000 } })
  @ApiOperation({ summary: '更新分类' })
  @ApiResponse({ status: 200, description: '更新成功' })
  updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: Partial<CreateAgentSkillCategoryDto>,
  ) {
    return this.agentSkillsService.updateCategory(id, updateCategoryDto);
  }

  @Delete('categories/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @ApiOperation({ summary: '删除分类' })
  @ApiResponse({ status: 200, description: '删除成功' })
  deleteCategory(@Param('id') id: string) {
    return this.agentSkillsService.deleteCategory(id);
  }

  // ========== Agent Skill相关 ==========
  @Get()
  @Throttle({ default: { limit: 30, ttl: 60000 } })
  @ApiOperation({ summary: '获取Agent Skill列表' })
  @ApiResponse({ status: 200, description: '成功返回Agent Skill列表' })
  findAll(@Query() query: QueryAgentSkillsDto) {
    return this.agentSkillsService.findAll(query);
  }

  @Get(':id')
  @Throttle({ default: { limit: 50, ttl: 60000 } })
  @ApiOperation({ summary: '获取Agent Skill详情' })
  @ApiResponse({ status: 200, description: '成功返回Agent Skill详情' })
  @ApiResponse({ status: 404, description: 'Agent Skill不存在' })
  findOne(@Param('id') id: string) {
    return this.agentSkillsService.findOne(id);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @ApiOperation({ summary: '创建Agent Skill' })
  @ApiResponse({ status: 201, description: '创建成功' })
  create(@Body() createSkillDto: CreateAgentSkillDto, @Request() req) {
    return this.agentSkillsService.create(createSkillDto, req.user.userId);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { limit: 20, ttl: 60000 } })
  @ApiOperation({ summary: '更新Agent Skill' })
  @ApiResponse({ status: 200, description: '更新成功' })
  update(
    @Param('id') id: string,
    @Body() updateSkillDto: Partial<CreateAgentSkillDto>,
  ) {
    return this.agentSkillsService.update(id, updateSkillDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @ApiOperation({ summary: '删除Agent Skill' })
  @ApiResponse({ status: 200, description: '删除成功' })
  delete(@Param('id') id: string) {
    return this.agentSkillsService.delete(id);
  }
}
