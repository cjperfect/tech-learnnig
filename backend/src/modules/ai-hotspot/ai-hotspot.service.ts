import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/services/prisma.service';
import { CreateAiHotspotDto, QueryAiHotspotsDto, CreateAiHotspotCategoryDto } from './dto/create-ai-hotspot.dto';

@Injectable()
export class AiHotspotService {
  constructor(private prisma: PrismaService) {}

  // ========== 分类相关 ==========
  async findCategories() {
    return this.prisma.aiHotspotCategory.findMany({
      orderBy: { sort: 'asc' },
      include: {
        _count: {
          select: { hotspots: true },
        },
      },
    });
  }

  async createCategory(createCategoryDto: CreateAiHotspotCategoryDto) {
    return this.prisma.aiHotspotCategory.create({
      data: createCategoryDto,
    });
  }

  async updateCategory(id: string, updateCategoryDto: Partial<CreateAiHotspotCategoryDto>) {
    const category = await this.prisma.aiHotspotCategory.findUnique({ where: { id } });
    if (!category) {
      throw new NotFoundException('分类不存在');
    }

    return this.prisma.aiHotspotCategory.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async deleteCategory(id: string) {
    const category = await this.prisma.aiHotspotCategory.findUnique({ where: { id } });
    if (!category) {
      throw new NotFoundException('分类不存在');
    }

    await this.prisma.aiHotspotCategory.delete({ where: { id } });
    return { message: '删除成功' };
  }

  // ========== AI Hotspot相关 ==========
  async findAll(query: QueryAiHotspotsDto) {
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
        { summary: { contains: search } },
      ];
    }

    const [hotspots, total] = await Promise.all([
      this.prisma.aiHotspot.findMany({
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
      this.prisma.aiHotspot.count({ where }),
    ]);

    return {
      items: hotspots,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async findOne(id: string) {
    const hotspot = await this.prisma.aiHotspot.findUnique({
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

    if (!hotspot) {
      throw new NotFoundException('AI热点不存在');
    }

    // 增加浏览量
    await this.prisma.aiHotspot.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
    });

    return hotspot;
  }

  async create(createHotspotDto: CreateAiHotspotDto, authorId?: string) {
    const { categoryId, tags, ...rest } = createHotspotDto;

    return this.prisma.aiHotspot.create({
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

  async update(id: string, updateHotspotDto: Partial<CreateAiHotspotDto>) {
    const hotspot = await this.prisma.aiHotspot.findUnique({ where: { id } });
    if (!hotspot) {
      throw new NotFoundException('AI热点不存在');
    }

    return this.prisma.aiHotspot.update({
      where: { id },
      data: updateHotspotDto,
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
    const hotspot = await this.prisma.aiHotspot.findUnique({ where: { id } });
    if (!hotspot) {
      throw new NotFoundException('AI热点不存在');
    }

    await this.prisma.aiHotspot.delete({ where: { id } });
    return { message: '删除成功' };
  }

  async incrementLikes(id: string) {
    const hotspot = await this.prisma.aiHotspot.findUnique({ where: { id } });
    if (!hotspot) {
      throw new NotFoundException('AI热点不存在');
    }

    const updated = await this.prisma.aiHotspot.update({
      where: { id },
      data: { likes: { increment: 1 } },
    });

    return { likes: updated.likes };
  }
}
