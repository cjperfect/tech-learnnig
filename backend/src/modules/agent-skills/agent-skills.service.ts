import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/services/prisma.service';
import { CreateAgentSkillDto, QueryAgentSkillsDto, CreateAgentSkillCategoryDto } from './dto/create-agent-skill.dto';

@Injectable()
export class AgentSkillsService {
  constructor(private prisma: PrismaService) {}

  // ========== 分类相关 ==========
  async findCategories() {
    return this.prisma.agentSkillCategory.findMany({
      orderBy: { sort: 'asc' },
      include: {
        _count: {
          select: { skills: true },
        },
      },
    });
  }

  async createCategory(createCategoryDto: CreateAgentSkillCategoryDto) {
    return this.prisma.agentSkillCategory.create({
      data: createCategoryDto,
    });
  }

  async updateCategory(id: string, updateCategoryDto: Partial<CreateAgentSkillCategoryDto>) {
    const category = await this.prisma.agentSkillCategory.findUnique({ where: { id } });
    if (!category) {
      throw new NotFoundException('分类不存在');
    }

    return this.prisma.agentSkillCategory.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async deleteCategory(id: string) {
    const category = await this.prisma.agentSkillCategory.findUnique({ where: { id } });
    if (!category) {
      throw new NotFoundException('分类不存在');
    }

    await this.prisma.agentSkillCategory.delete({ where: { id } });
    return { message: '删除成功' };
  }

  // ========== Agent Skill相关 ==========
  async findAll(query: QueryAgentSkillsDto) {
    const { categoryId, search, difficulty, page = 1, pageSize = 10 } = query;
    const skip = (page - 1) * pageSize;

    const where: any = {};

    // 分类筛选
    if (categoryId) {
      where.categoryId = categoryId;
    }

    // 难度筛选
    if (difficulty) {
      where.difficulty = difficulty;
    }

    // 搜索条件
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
      ];
    }

    const [skills, total] = await Promise.all([
      this.prisma.agentSkill.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
        include: {
          category: true,
          author: {
            select: {
              id: true,
              nickname: true,
              avatar: true,
            },
          },
        },
      }),
      this.prisma.agentSkill.count({ where }),
    ]);

    return {
      items: skills,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async findOne(id: string) {
    const skill = await this.prisma.agentSkill.findUnique({
      where: { id },
      include: {
        category: true,
        author: {
          select: {
            id: true,
            nickname: true,
            avatar: true,
          },
        },
      },
    });

    if (!skill) {
      throw new NotFoundException('Agent Skill不存在');
    }

    // 增加使用次数
    await this.prisma.agentSkill.update({
      where: { id },
      data: { usage: { increment: 1 } },
    });

    return skill;
  }

  async create(createSkillDto: CreateAgentSkillDto, authorId?: string) {
    const { categoryId, tags, ...rest } = createSkillDto;

    return this.prisma.agentSkill.create({
      data: {
        ...rest,
        categoryId,
        tags: tags as any,
        difficulty: rest.difficulty || 'beginner',
        authorId,
      },
      include: {
        category: true,
        author: {
          select: {
            id: true,
            nickname: true,
            avatar: true,
          },
        },
      },
    });
  }

  async update(id: string, updateSkillDto: Partial<CreateAgentSkillDto>) {
    const skill = await this.prisma.agentSkill.findUnique({ where: { id } });
    if (!skill) {
      throw new NotFoundException('Agent Skill不存在');
    }

    return this.prisma.agentSkill.update({
      where: { id },
      data: updateSkillDto,
      include: {
        category: true,
        author: {
          select: {
            id: true,
            nickname: true,
            avatar: true,
          },
        },
      },
    });
  }

  async delete(id: string) {
    const skill = await this.prisma.agentSkill.findUnique({ where: { id } });
    if (!skill) {
      throw new NotFoundException('Agent Skill不存在');
    }

    await this.prisma.agentSkill.delete({ where: { id } });
    return { message: '删除成功' };
  }
}
