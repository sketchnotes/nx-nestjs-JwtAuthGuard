import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PostInterace } from './post';

@ObjectType()
export class Post implements PostInterace {
  @Field(type => ID)
  id: number;
  
  @Field()
  title: string;
}
