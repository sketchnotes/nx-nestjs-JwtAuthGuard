import { UseGuards, forwardRef, Inject } from '@nestjs/common';
import { Resolver, Query, Mutation, Context, Info } from '@nestjs/graphql';

import { Post } from '@v-10/api-shared';
import { JwtAuthGuard } from '@v-10/authors';
import { PostsService } from './posts.service';

@Resolver(of => Post)
export class PostsResolver {
  constructor(
    private readonly postsService: PostsService,
  ) {}

  @Query(returns => [Post])
  async posts(): Promise<Post[]> {
    const posts = await this.postsService.getAll();
    return posts;
  }

  @Mutation(returns => Boolean)
  @UseGuards(JwtAuthGuard)  // => throw new InvalidDecoratorItemException(decorator, item, context.name);
                            // => Error: Invalid guard passed to @UseGuards() decorator (PostsResolver).
  async test1(
    @Context() context: any,
    @Info() info: any,
  ): Promise<boolean> {
    console.log('info', info);
    return !0;
  }
}