import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { AuthorInterace, Role } from './author';

registerEnumType(Role, {
  name: 'Role',
});

@ObjectType()
export class Author implements AuthorInterace {
  @Field(type => ID)
  id: number;
  
  @Field()
  nickname: string;
  
  @Field()
  password: string;

  @Field()
  salt: string;

  @Field(
    type => Role,
  )
  role: Role;
}
