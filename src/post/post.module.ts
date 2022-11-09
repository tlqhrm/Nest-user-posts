import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { DatabaseModule } from 'src/database/database.module';
import { postProviders } from './entities/post.providers';
import { PostRepository } from './post.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [PostController],
  providers: [PostService, ...postProviders, PostRepository],
  exports: [...postProviders, PostRepository],
})
export class PostModule {}
