import { InputType, Field } from '@nestjs/graphql';

import { PostInterace } from '../models/post';

@InputType()
export class CreatePostDto implements PostInterace {
  @Field()
  title: string;
}
