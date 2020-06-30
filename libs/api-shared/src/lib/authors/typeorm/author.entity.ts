import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthorInterace, Role } from '../models/author';
import { PostEntity } from '@v-10/posts';

@Entity({ name: 'author' })
export class AuthorEntity extends BaseEntity implements AuthorInterace {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickname: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.STUDENT
  })
  role: Role;

  @OneToMany('PostEntity', 'author', { eager: true })
  posts: PostEntity[];

  @BeforeInsert()
  async hashPassword() {
    console.log('BeforeInsert')
    this.salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, this.salt);
  }

  public async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    console.log('Denys', hash === this.password)
    return hash === this.password;
  }
}