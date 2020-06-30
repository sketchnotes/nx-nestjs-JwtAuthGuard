import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from '@v-10/database';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { postProviders } from './post.providers';
import { AuthorsModule } from '@v-10/authors';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => AuthorsModule),
  ],
  providers: [
    ...postProviders,
    PostsService,
    PostsResolver,
  ],
  exports: [
    PostsService,
    PostsResolver,
  ],
})
export class PostsModule {}
