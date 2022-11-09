import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from './entities/user.providers';
import { AuthModule } from 'src/auth/auth.module';
import { UserRepository } from './user.repository';
import { PostModule } from 'src/post/post.module';

@Module({
  imports: [DatabaseModule, AuthModule, PostModule],
  controllers: [UserController],
  providers: [UserService, ...userProviders, UserRepository],
})
export class UserModule {}
