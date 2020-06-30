import { Resolver, Query, ResolveField, Parent, Mutation, Args, Context, Info } from '@nestjs/graphql';
import { Author, CreateAuthorDto } from '@v-10/api-shared';
import { AuthorsService } from './authors.service';
import { PostsService } from '@v-10/posts';
import { Post } from '@v-10/posts';
import { forwardRef, Inject, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './JwtAuthGuard';

@Resolver(of => Author)
export class AuthorsResolver {
  constructor(
    private readonly authorsService: AuthorsService,
    private readonly postsService: PostsService,
  ) {}

  @Query(returns => [Author])
  async authors(): Promise<Author[]> {
    const authors = await this.authorsService.getAll();
    return authors;
  }

  @Mutation(returns => Author)
  async createAuthor(
    @Args(
      { name: 'input', type: () => CreateAuthorDto }
    ) input: CreateAuthorDto
  ) {
    const author = await this.authorsService.create(input);

    return author;
  }

  @ResolveField('posts', returns => [Post])
  async getPosts(@Parent() author: Author) {
    const { id } = author;
    return this.postsService.getAll();
  }

  @Mutation(returns => Boolean)
  @UseGuards(JwtAuthGuard)
  async test(
    @Context() context: any,
    @Info() info: any,
  ): Promise<boolean> {
    console.log('info', info);
    return !0;
  }  
}
