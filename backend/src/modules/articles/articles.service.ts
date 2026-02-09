import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/services/prisma.service';
import { CreateArticleDto, QueryArticlesDto } from './dto/create-article.dto';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: QueryArticlesDto) {
    const { search, tag, page = 1, pageSize = 10 } = query;
    const skip = (page - 1) * pageSize;

    const where: any = {};

    // 搜索条件
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { summary: { contains: search } },
      ];
    }

    // 标签筛选 - Json类型需要使用字符串搜索
    if (tag) {
      where.tags = {
        path: '$',
        string_contains: tag,
      };
    }

    const [articles, total] = await Promise.all([
      this.prisma.article.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
        include: {
          author: {
            select: {
              id: true,
              nickname: true,
              avatar: true,
            },
          },
        },
      }),
      this.prisma.article.count({ where }),
    ]);

    return {
      items: articles,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async findOne(id: string) {
    const article = await this.prisma.article.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            nickname: true,
            avatar: true,
          },
        },
      },
    });

    if (!article) {
      throw new NotFoundException('文章不存在');
    }

    // 增加阅读量
    await this.prisma.article.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
    });

    return article;
  }

  async create(createArticleDto: CreateArticleDto, authorId: string) {
    const { tags, ...rest } = createArticleDto;

    return this.prisma.article.create({
      data: {
        ...rest,
        tags: tags as any, // Json type handling
        authorId,
      },
      include: {
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

  async update(id: string, updateArticleDto: Partial<CreateArticleDto>) {
    const article = await this.prisma.article.findUnique({ where: { id } });
    if (!article) {
      throw new NotFoundException('文章不存在');
    }

    return this.prisma.article.update({
      where: { id },
      data: updateArticleDto,
      include: {
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

  async remove(id: string) {
    const article = await this.prisma.article.findUnique({ where: { id } });
    if (!article) {
      throw new NotFoundException('文章不存在');
    }

    await this.prisma.article.delete({ where: { id } });
    return { message: '删除成功' };
  }

  async getAllTags() {
    const articles = await this.prisma.article.findMany({
      select: { tags: true },
    });

    // Json类型需要先转换为数组
    const allTags = articles.flatMap((a) => {
      const tagArray = Array.isArray(a.tags) ? a.tags : [];
      return tagArray;
    });
    const uniqueTags = Array.from(new Set(allTags));

    return uniqueTags;
  }
}
