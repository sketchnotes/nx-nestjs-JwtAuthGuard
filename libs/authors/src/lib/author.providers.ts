import { Connection } from 'typeorm';
import {
  AUTHOR_REPOSITORY,
  DATABASE_CONNECTION
} from '@v-10/api-shared';
import { AuthorEntity } from '@v-10/api-shared';

export const authorProviders = [
  {
    provide: AUTHOR_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(AuthorEntity),
    inject: [DATABASE_CONNECTION],
  },
];