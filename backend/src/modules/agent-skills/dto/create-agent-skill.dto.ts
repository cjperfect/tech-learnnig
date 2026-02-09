import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsArray, IsOptional, Min, IsNumber, IsInt, IsIn } from 'class-validator';

export class CreateAgentSkillDto {
  @ApiProperty({ example: 'CSV 数据分析', description: '技能标题' })
  @IsString()
  title: string;

  @ApiProperty({
    example: '分析 CSV 文件中的数据，生成统计报告和可视化建议。',
    description: '技能描述',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 'async function analyzeCSV(filePath) { ... }',
    description: '代码示例',
  })
  @IsString()
  code: string;

  @ApiProperty({
    example: '{"timeout": 30000, "maxFileSize": "10MB"}',
    description: '配置说明',
    required: false,
  })
  @IsString()
  @IsOptional()
  config?: string;

  @ApiProperty({ example: 'data-analysis', description: '分类ID' })
  @IsString()
  categoryId: string;

  @ApiProperty({
    example: ['csv', '数据分析', '统计'],
    description: '标签',
  })
  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @ApiProperty({
    example: 'beginner',
    description: '难度等级',
    enum: ['beginner', 'intermediate', 'advanced'],
  })
  @IsString()
  @IsIn(['beginner', 'intermediate', 'advanced'])
  difficulty: string;
}

export class QueryAgentSkillsDto {
  @ApiProperty({ example: 'data-analysis', description: '分类ID', required: false })
  @IsString()
  @IsOptional()
  categoryId?: string;

  @ApiProperty({ example: 'csv', description: '搜索关键词', required: false })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiProperty({
    example: 'beginner',
    description: '难度等级',
    required: false,
    enum: ['beginner', 'intermediate', 'advanced'],
  })
  @IsString()
  @IsOptional()
  @IsIn(['beginner', 'intermediate', 'advanced'])
  difficulty?: string;

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

export class CreateAgentSkillCategoryDto {
  @ApiProperty({ example: '数据分析', description: '分类名称' })
  @IsString()
  name: string;

  @ApiProperty({
    example: '数据分析相关技能',
    description: '分类描述',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 'FiBarChart',
    description: '图标名称',
    required: false,
  })
  @IsString()
  @IsOptional()
  icon?: string;

  @ApiProperty({ example: 'data-analysis', description: '分类缩写' })
  @IsString()
  slug: string;

  @ApiProperty({ example: 0, description: '排序', required: false })
  @IsNumber()
  @IsOptional()
  sort?: number = 0;
}
