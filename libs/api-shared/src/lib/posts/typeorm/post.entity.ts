import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { PostInterace } from '../models/post';
import { AuthorEntity } from '../../authors/typeorm/author.entity';

@Entity({ name: 'post' })
export class PostEntity extends BaseEntity implements PostInterace {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne('AuthorEntity', 'posts', { eager: false, nullable: true })
  author: AuthorEntity;
}
