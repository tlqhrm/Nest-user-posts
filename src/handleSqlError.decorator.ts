import { HttpException } from '@nestjs/common';

export function HandleSqlError(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  const originMethod = descriptor.value;
  descriptor.value = async function (...args) {
    try {
      const result = await originMethod.apply(this, args);
      return result;
    } catch (error) {
      if (error.sqlMessage) {
        if (error.code === 'ER_DUP_ENTRY') {
          throw new HttpException('already exists', 409);
        }
        throw new HttpException('Sql Error', 400);
      }
      throw new HttpException(`unknown error`, 500);
    }
  };
}
