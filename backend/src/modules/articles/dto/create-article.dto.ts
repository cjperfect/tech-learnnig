import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsArray, IsOptional, Min, IsNumber } from 'class-validator';

export class CreateArticleDto {
  @ApiProperty({ example: 'Next.js 14 完全指南', description: '文章标题' })
  @IsString()
  title: string;

  @ApiProperty({
    example: '这是一篇关于Next.js 14的详细教程...',
    description: '文章内容(Markdown)',
  })
  @IsString()
  content: string;

  @ApiProperty({
    example: '深入了解Next.js 14的新特性...',
    description: '文章摘要',
    required: false,
  })
  @IsString()
  @IsOptional()
  summary?: string;

  @ApiProperty({
    example: ['https://example.com/cover.jpg'],
    description: '封面图片',
    required: false,
  })
  @IsString()
  @IsOptional()
  coverImage?: string;

  @ApiProperty({
    example: ['Next.js', 'React', '前端框架'],
    description: '文章标签',
  })
  @IsArray()
  @IsString({ each: true })
  tags: string[];
}

export class QueryArticlesDto {
  @ApiProperty({ example: 'Next.js', description: '搜索关键词', required: false })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiProperty({ example: 'Next.js', description: '标签筛选', required: false })
  @IsString()
  @IsOptional()
  tag?: string;

  @ApiProperty({ example: 1, description: '页码', required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiProperty({ example: 10, description: '每页数量', required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  pageSize?: number = 10;
}
