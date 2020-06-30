import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthorEntity, PostEntity } from '@v-10/api-shared';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'denys',
  entities: [
    AuthorEntity, PostEntity,
  ],
  synchronize: process.env.NODE_ENV !== 'production',
  // logging: process.env.NODE_ENV !== 'production',
}
