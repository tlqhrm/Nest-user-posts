import { ApiParam, ApiProperty } from '@nestjs/swagger';
import { Post } from '../entities/post.entity';

export class AllPostsDto {
  total_count: number;
  isEnd: boolean;
  posts: Post[];
}
