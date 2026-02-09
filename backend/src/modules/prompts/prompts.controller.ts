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
import { PromptsService } from './prompts.service';
import { CreatePromptDto, QueryPromptsDto, CreatePromptCategoryDto } from './dto/create-prompt.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('prompts')
@Controller('prompts')
export class PromptsController {
  constructor(private readonly promptsService: PromptsService) {}

  // ========== 分类相关 ==========
  @Get('categories')
  @Throttle({ default: { limit: 30, ttl: 60000 } })
  @ApiOperation({ summary: '获取所有分类' })
  @ApiResponse({ status: 200, description: '成功返回分类列表' })
  findCategories() {
    return this.promptsService.findCategories();
  }

  @Post('categories')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @ApiOperation({ summary: '创建分类' })
  @ApiResponse({ status: 201, description: '创建成功' })
  createCategory(@Body() createCategoryDto: CreatePromptCategoryDto) {
    return this.promptsService.createCategory(createCategoryDto);
  }

  @Put('categories/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { limit: 20, ttl: 60000 } })
  @ApiOperation({ summary: '更新分类' })
  @ApiResponse({ status: 200, description: '更新成功' })
  updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: Partial<CreatePromptCategoryDto>,
  ) {
    return this.promptsService.updateCategory(id, updateCategoryDto);
  }

  @Delete('categories/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @ApiOperation({ summary: '删除分类' })
  @ApiResponse({ status: 200, description: '删除成功' })
  deleteCategory(@Param('id') id: string) {
    return this.promptsService.deleteCategory(id);
  }

  // ========== Prompt相关 ==========
  @Get()
  @Throttle({ default: { limit: 30, ttl: 60000 } })
  @ApiOperation({ summary: '获取Prompt列表' })
  @ApiResponse({ status: 200, description: '成功返回Prompt列表' })
  findAll(@Query() query: QueryPromptsDto) {
    return this.promptsService.findAll(query);
  }

  @Get(':id')
  @Throttle({ default: { limit: 50, ttl: 60000 } })
  @ApiOperation({ summary: '获取Prompt详情' })
  @ApiResponse({ status: 200, description: '成功返回Prompt详情' })
  @ApiResponse({ status: 404, description: 'Prompt不存在' })
  findOne(@Param('id') id: string) {
    return this.promptsService.findOne(id);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @ApiOperation({ summary: '创建Prompt' })
  @ApiResponse({ status: 201, description: '创建成功' })
  create(@Body() createPromptDto: CreatePromptDto, @Request() req) {
    return this.promptsService.create(createPromptDto, req.user.userId);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { limit: 20, ttl: 60000 } })
  @ApiOperation({ summary: '更新Prompt' })
  @ApiResponse({ status: 200, description: '更新成功' })
  update(
    @Param('id') id: string,
    @Body() updatePromptDto: Partial<CreatePromptDto>,
  ) {
    return this.promptsService.update(id, updatePromptDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @ApiOperation({ summary: '删除Prompt' })
  @ApiResponse({ status: 200, description: '删除成功' })
  delete(@Param('id') id: string) {
    return this.promptsService.delete(id);
  }

  @Post(':id/copy')
  @Throttle({ default: { limit: 30, ttl: 60000 } })
  @ApiOperation({ summary: '增加复制次数' })
  @ApiResponse({ status: 200, description: '成功' })
  copy(@Param('id') id: string) {
    return this.promptsService.incrementCopies(id);
  }

  @Post(':id/like')
  @Throttle({ default: { limit: 30, ttl: 60000 } })
  @ApiOperation({ summary: '点赞' })
  @ApiResponse({ status: 200, description: '成功' })
  like(@Param('id') id: string) {
    return this.promptsService.incrementLikes(id);
  }
}
