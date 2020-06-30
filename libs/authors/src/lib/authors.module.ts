import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '@v-10/database';
import { AuthorsService } from './authors.service';
import { AuthorsResolver } from './authors.resolver';
import { authorProviders } from './author.providers';
import { JwtStrategy } from './jwt.strategy';
import { PostsModule } from '@v-10/posts';
// import { AuthModule } from '@v-10/auth';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => PostsModule),
    // forwardRef(() => AuthModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { 
        expiresIn: 60 * 60
      }
    }),
  ],
  providers: [
    ...authorProviders,
    AuthorsService,
    AuthorsResolver,
    JwtStrategy,
  ],
  exports: [
    AuthorsService,
    AuthorsResolver,
    JwtStrategy, PassportModule,
  ],
})
export class AuthorsModule {}
