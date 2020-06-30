import { Injectable, Inject } from '@nestjs/common';
import { PostEntity } from '../../../api-shared/src/lib/posts/typeorm/post.entity';
import { POST_REPOSITORY } from '@v-10/api-shared';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @Inject(POST_REPOSITORY)
    private readonly postRepository: Repository<PostEntity>
  ) {}

  async getByAuthor(authorId: number, page: number = 1) {
    try {
      const posts = await this.postRepository.find({
        where: { author: { id: authorId} },
        relations: ['author'],
        take: 10,
        skip: 10 * (page -1)
      });
      return posts;
    } catch(err) {
      console.error(err);
    }
    return null;
  }

  async getAll(): Promise<PostEntity[]> {
    const query = this.postRepository.createQueryBuilder();

    const posts = await query.getMany();

    return posts;
  }
}
