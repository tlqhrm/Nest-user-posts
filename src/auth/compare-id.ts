import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  mixin,
  Type,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const compareId = (): Type<CanActivate> => {
  @Injectable()
  class CompareIdMixin implements CanActivate {
    constructor(private reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      if (request['user']['id'] !== request['body']['ownerId'])
        throw new HttpException('Fobidden', 403);
      return true;
    }
  }
  return mixin(CompareIdMixin);
};
