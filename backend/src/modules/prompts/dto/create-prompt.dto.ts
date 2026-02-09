import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsOptional, Min, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePromptDto {
  @ApiProperty({ example: '代码审查助手', description: 'Prompt标题' })
  @IsString()
  title: string;

  @ApiProperty({
    example: '你是一位经验丰富的代码审查专家...',
    description: 'Prompt内容',
  })
  @IsString()
  content: string;

  @ApiProperty({
    example: '帮助审查代码，发现潜在问题',
    description: 'Prompt描述',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'coding', description: '分类ID' })
  @IsString()
  categoryId: string;

  @ApiProperty({
    example: ['代码审查', '最佳实践'],
    description: '标签',
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];
}

export class QueryPromptsDto {
  @ApiProperty({ example: 'coding', description: '分类ID', required: false })
  @IsString()
  @IsOptional()
  categoryId?: string;

  @ApiProperty({ example: 1, description: '页码', required: false })
  @IsOptional()
  @Min(1)
  @Type(() => Number)
  page?: number = 1;

  @ApiProperty({ example: 10, description: '每页数量', required: false })
  @IsOptional()
  @Min(1)
  @Type(() => Number)
  pageSize?: number = 10;
}

export class CreatePromptCategoryDto {
  @ApiProperty({ example: '代码开发', description: '分类名称' })
  @IsString()
  name: string;

  @ApiProperty({
    example: '代码相关的Prompt',
    description: '分类描述',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 'FiCode',
    description: '图标名称',
    required: false,
  })
  @IsString()
  @IsOptional()
  icon?: string;

  @ApiProperty({ example: 'coding', description: '分类缩写' })
  @IsString()
  slug: string;

  @ApiProperty({ example: 0, description: '排序', required: false })
  @IsNumber()
  @IsOptional()
  sort?: number = 0;
}
