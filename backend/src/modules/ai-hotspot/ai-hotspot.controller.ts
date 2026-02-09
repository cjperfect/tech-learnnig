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
import { AiHotspotService } from './ai-hotspot.service';
import { CreateAiHotspotDto, QueryAiHotspotsDto, CreateAiHotspotCategoryDto } from './dto/create-ai-hotspot.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('ai-hotspot')
@Controller('ai-hotspot')
export class AiHotspotController {
  constructor(private readonly aiHotspotService: AiHotspotService) {}

  // ========== 分类相关 ==========
  @Get('categories')
  @Throttle({ default: { limit: 30, ttl: 60000 } })
  @ApiOperation({ summary: '获取所有分类' })
  @ApiResponse({ status: 200, description: '成功返回分类列表' })
  findCategories() {
    return this.aiHotspotService.findCategories();
  }

  @Post('categories')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @ApiOperation({ summary: '创建分类' })
  @ApiResponse({ status: 201, description: '创建成功' })
  createCategory(@Body() createCategoryDto: CreateAiHotspotCategoryDto) {
    return this.aiHotspotService.createCategory(createCategoryDto);
  }

  @Put('categories/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { limit: 20, ttl: 60000 } })
  @ApiOperation({ summary: '更新分类' })
  @ApiResponse({ status: 200, description: '更新成功' })
  updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: Partial<CreateAiHotspotCategoryDto>,
  ) {
    return this.aiHotspotService.updateCategory(id, updateCategoryDto);
  }

  @Delete('categories/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @ApiOperation({ summary: '删除分类' })
  @ApiResponse({ status: 200, description: '删除成功' })
  deleteCategory(@Param('id') id: string) {
    return this.aiHotspotService.deleteCategory(id);
  }

  // ========== AI Hotspot相关 ==========
  @Get()
  @Throttle({ default: { limit: 30, ttl: 60000 } })
  @ApiOperation({ summary: '获取AI热点列表' })
  @ApiResponse({ status: 200, description: '成功返回AI热点列表' })
  findAll(@Query() query: QueryAiHotspotsDto) {
    return this.aiHotspotService.findAll(query);
  }

  @Get(':id')
  @Throttle({ default: { limit: 50, ttl: 60000 } })
  @ApiOperation({ summary: '获取AI热点详情' })
  @ApiResponse({ status: 200, description: '成功返回AI热点详情' })
  @ApiResponse({ status: 404, description: 'AI热点不存在' })
  findOne(@Param('id') id: string) {
    return this.aiHotspotService.findOne(id);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @ApiOperation({ summary: '创建AI热点' })
  @ApiResponse({ status: 201, description: '创建成功' })
  create(@Body() createHotspotDto: CreateAiHotspotDto, @Request() req) {
    return this.aiHotspotService.create(createHotspotDto, req.user.userId);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { limit: 20, ttl: 60000 } })
  @ApiOperation({ summary: '更新AI热点' })
  @ApiResponse({ status: 200, description: '更新成功' })
  update(
    @Param('id') id: string,
    @Body() updateHotspotDto: Partial<CreateAiHotspotDto>,
  ) {
    return this.aiHotspotService.update(id, updateHotspotDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @ApiOperation({ summary: '删除AI热点' })
  @ApiResponse({ status: 200, description: '删除成功' })
  delete(@Param('id') id: string) {
    return this.aiHotspotService.delete(id);
  }

  @Post(':id/like')
  @Throttle({ default: { limit: 30, ttl: 60000 } })
  @ApiOperation({ summary: '点赞' })
  @ApiResponse({ status: 200, description: '成功' })
  like(@Param('id') id: string) {
    return this.aiHotspotService.incrementLikes(id);
  }
}
