import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CoreGqlModule } from '@v-10/core-gql';

@Module({
  imports: [CoreGqlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
