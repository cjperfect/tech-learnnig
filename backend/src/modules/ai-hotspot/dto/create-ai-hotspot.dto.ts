import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsArray, IsOptional, IsUrl, Min, IsNumber, IsInt } from 'class-validator';

export class CreateAiHotspotDto {
  @ApiProperty({ example: 'GPT-5 即将发布：传闻中的多模态能力', description: '热点标题' })
  @IsString()
  title: string;

  @ApiProperty({
    example: '# GPT-5 即将发布\n\n据可靠消息源透露，OpenAI 正在开发 GPT-5...',
    description: '热点内容(Markdown)',
  })
  @IsString()
  content: string;

  @ApiProperty({
    example: 'OpenAI 的 GPT-5 据称将拥有突破性的多模态能力和更长的上下文窗口。',
    description: '热点摘要',
    required: false,
  })
  @IsString()
  @IsOptional()
  summary?: string;

  @ApiProperty({
    example: 'TechCrunch',
    description: '来源',
    required: false,
  })
  @IsString()
  @IsOptional()
  source?: string;

  @ApiProperty({
    example: 'https://techcrunch.com/gpt5-rumors',
    description: '来源链接',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  sourceUrl?: string;

  @ApiProperty({ example: 'llm', description: '分类ID' })
  @IsString()
  categoryId: string;

  @ApiProperty({
    example: ['GPT-5', 'OpenAI', '多模态'],
    description: '标签',
  })
  @IsArray()
  @IsString({ each: true })
  tags: string[];
}

export class QueryAiHotspotsDto {
  @ApiProperty({ example: 'llm', description: '分类ID', required: false })
  @IsString()
  @IsOptional()
  categoryId?: string;

  @ApiProperty({ example: 'GPT-5', description: '搜索关键词', required: false })
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

export class CreateAiHotspotCategoryDto {
  @ApiProperty({ example: '大模型', description: '分类名称' })
  @IsString()
  name: string;

  @ApiProperty({
    example: '大型语言模型相关资讯',
    description: '分类描述',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 'FiCpu',
    description: '图标名称',
    required: false,
  })
  @IsString()
  @IsOptional()
  icon?: string;

  @ApiProperty({ example: 'llm', description: '分类缩写' })
  @IsString()
  slug: string;

  @ApiProperty({ example: 0, description: '排序', required: false })
  @IsNumber()
  @IsOptional()
  sort?: number = 0;
}
