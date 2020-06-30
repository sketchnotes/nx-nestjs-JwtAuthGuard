import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AUTHOR_REPOSITORY } from '@v-10/api-shared';
import { AuthorEntity, CreateAuthorDto } from '@v-10/api-shared';

@Injectable()
export class AuthorsService {
  constructor(
    @Inject(AUTHOR_REPOSITORY)
    private readonly authorRepository: Repository<AuthorEntity>,
  ) {}

  async getAll(): Promise<AuthorEntity[]> {
    const query = this.authorRepository.createQueryBuilder();

    const authors = await query.getMany();

    return authors;
  }

  async create(input: CreateAuthorDto): Promise<AuthorEntity> {
    const author = await this.authorRepository.create(input);
    await this.authorRepository.save(author);

    return author;
  }

  async getAuthorByNickname(nickname: string): Promise<AuthorEntity> {
    const author = await this.authorRepository.findOne({
      where: {
        nickname
      }
    })

    if (!author) {
      throw new NotFoundException(`Author with Nickname ${nickname} not found`);
    }

    return author;
  }

  async validateAuthorPassword(
    nickname: string,
    password: string
  ): Promise<AuthorEntity> {

    const author = await this.getAuthorByNickname(nickname);

    return (author && await author.validatePassword(password)) ? author : null;
  }
}