import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { AllPostsDto } from './dto/all-posts';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(private postRepository: PostRepository) {}

  async createPost(createPostDto: CreatePostDto, id: string): Promise<Post> {
    const result = await this.postRepository.createPost(createPostDto, id);

    return result;
  }

  async findAllPost(page: number): Promise<AllPostsDto> {
    const viewCount = 10;
    const start = (page - 1) * viewCount;

    const totalCount = await this.postRepository.getPostTotalCount();
    const posts = await this.postRepository.findAllPost(viewCount, start);

    const result = {
      total_count: totalCount,
      isEnd: totalCount - viewCount * page <= 0 ? true : false,
      posts,
    };
    return result;
  }

  async findPostById(id: number): Promise<Post> {
    const result = await this.postRepository.findPostById(id);
    if (!result) throw new BadRequestException('post does not exist');
    return result;
  }

  async updatePost(id: number, updatePostDto: UpdatePostDto) {
    const result = await this.postRepository.updatePost(id, updatePostDto);
    if (result['affected'] === 1) return await this.findPostById(id);
    else throw new HttpException(`post id: ${id} is not existed`, 400);
  }

  async removePost(id: number): Promise<string> {
    const result = await this.postRepository.removePost(id);
    console.log(result);
    if (result['affected'] === 1) return `post id: ${id} is deleted`;
    else throw new HttpException(`post id: ${id} is not existed`, 400);
  }
}
