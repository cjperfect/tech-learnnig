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
import { McpsService } from './mcps.service';
import { CreateMcpDto, QueryMcpsDto, CreateMcpCategoryDto } from './dto/create-mcp.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('mcps')
@Controller('mcps')
export class McpsController {
  constructor(private readonly mcpsService: McpsService) {}

  // ========== 分类相关 ==========
  @Get('categories')
  @Throttle({ default: { limit: 30, ttl: 60000 } })
  @ApiOperation({ summary: '获取所有分类' })
  @ApiResponse({ status: 200, description: '成功返回分类列表' })
  findCategories() {
    return this.mcpsService.findCategories();
  }

  @Post('categories')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @ApiOperation({ summary: '创建分类' })
  @ApiResponse({ status: 201, description: '创建成功' })
  createCategory(@Body() createCategoryDto: CreateMcpCategoryDto) {
    return this.mcpsService.createCategory(createCategoryDto);
  }

  @Put('categories/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { limit: 20, ttl: 60000 } })
  @ApiOperation({ summary: '更新分类' })
  @ApiResponse({ status: 200, description: '更新成功' })
  updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: Partial<CreateMcpCategoryDto>,
  ) {
    return this.mcpsService.updateCategory(id, updateCategoryDto);
  }

  @Delete('categories/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @ApiOperation({ summary: '删除分类' })
  @ApiResponse({ status: 200, description: '删除成功' })
  deleteCategory(@Param('id') id: string) {
    return this.mcpsService.deleteCategory(id);
  }

  // ========== MCP相关 ==========
  @Get()
  @Throttle({ default: { limit: 30, ttl: 60000 } })
  @ApiOperation({ summary: '获取MCP列表' })
  @ApiResponse({ status: 200, description: '成功返回MCP列表' })
  findAll(@Query() query: QueryMcpsDto) {
    return this.mcpsService.findAll(query);
  }

  @Get(':id')
  @Throttle({ default: { limit: 50, ttl: 60000 } })
  @ApiOperation({ summary: '获取MCP详情' })
  @ApiResponse({ status: 200, description: '成功返回MCP详情' })
  @ApiResponse({ status: 404, description: 'MCP不存在' })
  findOne(@Param('id') id: string) {
    return this.mcpsService.findOne(id);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @ApiOperation({ summary: '创建MCP' })
  @ApiResponse({ status: 201, description: '创建成功' })
  create(@Body() createMcpDto: CreateMcpDto, @Request() req) {
    return this.mcpsService.create(createMcpDto, req.user.userId);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { limit: 20, ttl: 60000 } })
  @ApiOperation({ summary: '更新MCP' })
  @ApiResponse({ status: 200, description: '更新成功' })
  update(
    @Param('id') id: string,
    @Body() updateMcpDto: Partial<CreateMcpDto>,
  ) {
    return this.mcpsService.update(id, updateMcpDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @ApiOperation({ summary: '删除MCP' })
  @ApiResponse({ status: 200, description: '删除成功' })
  delete(@Param('id') id: string) {
    return this.mcpsService.delete(id);
  }

  @Post(':id/download')
  @Throttle({ default: { limit: 30, ttl: 60000 } })
  @ApiOperation({ summary: '增加下载次数' })
  @ApiResponse({ status: 200, description: '成功' })
  download(@Param('id') id: string) {
    return this.mcpsService.incrementDownloads(id);
  }
}
