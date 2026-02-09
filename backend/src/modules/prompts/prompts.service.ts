import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/services/prisma.service';
import { CreatePromptDto, QueryPromptsDto, CreatePromptCategoryDto } from './dto/create-prompt.dto';

@Injectable()
export class PromptsService {
  constructor(private prisma: PrismaService) {}

  // ========== 分类相关 ==========
  async findCategories() {
    return this.prisma.promptCategory.findMany({
      orderBy: { sort: 'asc' },
      include: {
        _count: {
          select: { prompts: true },
        },
      },
    });
  }

  async createCategory(createCategoryDto: CreatePromptCategoryDto) {
    return this.prisma.promptCategory.create({
      data: createCategoryDto,
    });
  }

  async updateCategory(id: string, updateCategoryDto: Partial<CreatePromptCategoryDto>) {
    const category = await this.prisma.promptCategory.findUnique({ where: { id } });
    if (!category) {
      throw new NotFoundException('分类不存在');
    }

    return this.prisma.promptCategory.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async deleteCategory(id: string) {
    const category = await this.prisma.promptCategory.findUnique({ where: { id } });
    if (!category) {
      throw new NotFoundException('分类不存在');
    }

    await this.prisma.promptCategory.delete({ where: { id } });
    return { message: '删除成功' };
  }

  // ========== Prompt相关 ==========
  async findAll(query: QueryPromptsDto) {
    const { categoryId, page = 1, pageSize = 10 } = query;
    const skip = (page - 1) * pageSize;

    const where: any = {};

    // 分类筛选
    if (categoryId) {
      where.categoryId = categoryId;
    }

    const [prompts, total] = await Promise.all([
      this.prisma.prompt.findMany({
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
      this.prisma.prompt.count({ where }),
    ]);

    return {
      items: prompts,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async findOne(id: string) {
    const prompt = await this.prisma.prompt.findUnique({
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

    if (!prompt) {
      throw new NotFoundException('Prompt不存在');
    }

    return prompt;
  }

  async create(createPromptDto: CreatePromptDto, authorId?: string) {
    const { categoryId, tags, ...rest } = createPromptDto;

    return this.prisma.prompt.create({
      data: {
        ...rest,
        categoryId,
        tags: tags as any, // Json type handling
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

  async update(id: string, updatePromptDto: Partial<CreatePromptDto>) {
    const prompt = await this.prisma.prompt.findUnique({ where: { id } });
    if (!prompt) {
      throw new NotFoundException('Prompt不存在');
    }

    return this.prisma.prompt.update({
      where: { id },
      data: updatePromptDto,
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
    const prompt = await this.prisma.prompt.findUnique({ where: { id } });
    if (!prompt) {
      throw new NotFoundException('Prompt不存在');
    }

    await this.prisma.prompt.delete({ where: { id } });
    return { message: '删除成功' };
  }

  async incrementCopies(id: string) {
    const prompt = await this.prisma.prompt.findUnique({ where: { id } });
    if (!prompt) {
      throw new NotFoundException('Prompt不存在');
    }

    await this.prisma.prompt.update({
      where: { id },
      data: { copies: { increment: 1 } },
    });

    return { message: '复制成功' };
  }

  async incrementLikes(id: string) {
    const prompt = await this.prisma.prompt.findUnique({ where: { id } });
    if (!prompt) {
      throw new NotFoundException('Prompt不存在');
    }

    const updated = await this.prisma.prompt.update({
      where: { id },
      data: { likes: { increment: 1 } },
    });

    return { likes: updated.likes };
  }
}
