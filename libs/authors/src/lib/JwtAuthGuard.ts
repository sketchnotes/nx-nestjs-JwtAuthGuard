import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') { // implements CanActivate {
  getRequest(context: ExecutionContext) {
    console.log('getReq')
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
  // canActivate(context: ExecutionContext): boolean {
  //   const ctx = GqlExecutionContext.create(context);
  //   return true;
  // }
}
