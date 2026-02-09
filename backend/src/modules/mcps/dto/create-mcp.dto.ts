import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsArray, IsOptional, IsUrl, Min, IsNumber, IsInt } from 'class-validator';

export class CreateMcpDto {
  @ApiProperty({ example: 'Filesystem MCP', description: 'MCP标题' })
  @IsString()
  title: string;

  @ApiProperty({
    example: '一个功能强大的文件系统 MCP 服务器...',
    description: 'MCP描述',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 'https://github.com/modelcontextprotocol/servers',
    description: 'GitHub 仓库地址',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  repository?: string;

  @ApiProperty({
    example: 'https://modelcontextprotocol.io/servers/filesystem/',
    description: '文档链接',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  documentation?: string;

  @ApiProperty({ example: 'filesystem', description: '分类ID' })
  @IsString()
  categoryId: string;

  @ApiProperty({
    example: ['filesystem', 'file-operations', 'local'],
    description: '标签',
  })
  @IsArray()
  @IsString({ each: true })
  tags: string[];
}

export class QueryMcpsDto {
  @ApiProperty({ example: 'filesystem', description: '分类ID', required: false })
  @IsString()
  @IsOptional()
  categoryId?: string;

  @ApiProperty({ example: 'filesystem', description: '搜索关键词', required: false })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiProperty({ example: 1, description: '页码', required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiProperty({ example: 10, description: '每页数量', required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageSize?: number = 10;
}

export class CreateMcpCategoryDto {
  @ApiProperty({ example: '文件系统', description: '分类名称' })
  @IsString()
  name: string;

  @ApiProperty({
    example: '文件系统相关的 MCP 服务器',
    description: '分类描述',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 'FiFolder',
    description: '图标名称',
    required: false,
  })
  @IsString()
  @IsOptional()
  icon?: string;

  @ApiProperty({ example: 'filesystem', description: '分类缩写' })
  @IsString()
  slug: string;

  @ApiProperty({ example: 0, description: '排序', required: false })
  @IsNumber()
  @IsOptional()
  sort?: number = 0;
}
