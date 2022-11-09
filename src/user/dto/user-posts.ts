import { Post } from 'src/post/entities/post.entity';

export class UserPostsDto {
  id: string;
  email: string;
  nickname: string;
  createdAt: string;
  posts: Post[];
  isEnd: boolean;
  total_count: number;
}
