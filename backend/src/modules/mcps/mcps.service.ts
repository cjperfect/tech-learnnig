import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/services/prisma.service';
import { CreateMcpDto, QueryMcpsDto, CreateMcpCategoryDto } from './dto/create-mcp.dto';

@Injectable()
export class McpsService {
  constructor(private prisma: PrismaService) {}

  // ========== 分类相关 ==========
  async findCategories() {
    return this.prisma.mcpCategory.findMany({
      orderBy: { sort: 'asc' },
      include: {
        _count: {
          select: { mcps: true },
        },
      },
    });
  }

  async createCategory(createCategoryDto: CreateMcpCategoryDto) {
    return this.prisma.mcpCategory.create({
      data: createCategoryDto,
    });
  }

  async updateCategory(id: string, updateCategoryDto: Partial<CreateMcpCategoryDto>) {
    const category = await this.prisma.mcpCategory.findUnique({ where: { id } });
    if (!category) {
      throw new NotFoundException('分类不存在');
    }

    return this.prisma.mcpCategory.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async deleteCategory(id: string) {
    const category = await this.prisma.mcpCategory.findUnique({ where: { id } });
    if (!category) {
      throw new NotFoundException('分类不存在');
    }

    await this.prisma.mcpCategory.delete({ where: { id } });
    return { message: '删除成功' };
  }

  // ========== MCP相关 ==========
  async findAll(query: QueryMcpsDto) {
    const { categoryId, search, page = 1, pageSize = 10 } = query;
    const skip = (page - 1) * pageSize;

    const where: any = {};

    // 分类筛选
    if (categoryId) {
      where.categoryId = categoryId;
    }

    // 搜索条件
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
      ];
    }

    const [mcps, total] = await Promise.all([
      this.prisma.mcp.findMany({
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
      this.prisma.mcp.count({ where }),
    ]);

    return {
      items: mcps,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async findOne(id: string) {
    const mcp = await this.prisma.mcp.findUnique({
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

    if (!mcp) {
      throw new NotFoundException('MCP不存在');
    }

    return mcp;
  }

  async create(createMcpDto: CreateMcpDto, authorId?: string) {
    const { categoryId, tags, ...rest } = createMcpDto;

    return this.prisma.mcp.create({
      data: {
        ...rest,
        categoryId,
        tags: tags as any,
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

  async update(id: string, updateMcpDto: Partial<CreateMcpDto>) {
    const mcp = await this.prisma.mcp.findUnique({ where: { id } });
    if (!mcp) {
      throw new NotFoundException('MCP不存在');
    }

    return this.prisma.mcp.update({
      where: { id },
      data: updateMcpDto,
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
    const mcp = await this.prisma.mcp.findUnique({ where: { id } });
    if (!mcp) {
      throw new NotFoundException('MCP不存在');
    }

    await this.prisma.mcp.delete({ where: { id } });
    return { message: '删除成功' };
  }

  async incrementDownloads(id: string) {
    const mcp = await this.prisma.mcp.findUnique({ where: { id } });
    if (!mcp) {
      throw new NotFoundException('MCP不存在');
    }

    await this.prisma.mcp.update({
      where: { id },
      data: { downloads: { increment: 1 } },
    });

    return { message: '下载成功' };
  }
}
