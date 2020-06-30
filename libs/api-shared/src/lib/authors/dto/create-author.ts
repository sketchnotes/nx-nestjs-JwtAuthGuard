import { InputType, Field } from '@nestjs/graphql';

import { AuthorInterace, Role } from '../models/author';

@InputType()
export class CreateAuthorDto implements AuthorInterace {
  @Field()
  nickname: string;

  @Field()
  password: string;

  @Field(type => Role, { nullable: true })
  role: Role;
}
