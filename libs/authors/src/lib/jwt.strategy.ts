import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './jwt.interface';
import { AuthorsService } from './authors.service';
import { AuthorEntity } from '@v-10/api-shared';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authorsService: AuthorsService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET,
    })
  }

  async validate(payload: JwtPayload): Promise<AuthorEntity> {

    const author = await this.authorsService.getAuthorByNickname(payload.email);

    if (!author) throw new UnauthorizedException();

    return author;
  }
}
