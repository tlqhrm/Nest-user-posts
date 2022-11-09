import { Inject, Injectable } from '@nestjs/common';
import { HandleSqlError } from 'src/handleSqlError.decorator';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostRepository {
  constructor(
    @Inject('POST_REPOSITORY') private postRepository: Repository<Post>,
  ) {}

  @HandleSqlError
  async createPost(createPostDto: CreatePostDto, id: string): Promise<Post> {
    const { title, content } = createPostDto;
    const post = new Post();
    post.title = title;
    post.content = content;
    post.owner = id;
    await this.postRepository
      .createQueryBuilder()
      .insert()
      .into('post')
      .values(post)
      .execute();
    return post;
  }

  @HandleSqlError
  async getPostTotalCount(): Promise<number> {
    const totalCount = await this.postRepository
      .createQueryBuilder()
      .select('count(*) as total_count')
      .getRawMany();

    return totalCount[0]['total_count'];
  }

  @HandleSqlError
  async getPostTotalCountById(id: string): Promise<number> {
    const totalCount = await this.postRepository
      .createQueryBuilder()
      .select('count(*) as total_count')
      .where('ownerId = :id', { id })
      .getRawMany();

    return totalCount[0]['total_count'];
  }

  @HandleSqlError
  async findAllPost(viewCount: number, start: number): Promise<Post[]> {
    return await this.postRepository
      .createQueryBuilder()
      .select('*')
      .orderBy('id', 'DESC')
      .limit(viewCount)
      .offset(start)
      .getRawMany();
  }

  @HandleSqlError
  async findPostById(id: number): Promise<Post> {
    const result = await this.postRepository
      .createQueryBuilder()
      .select('*')
      .where('id = :id', { id })
      .getRawOne();
    console.log(result);
    return result;
  }

  @HandleSqlError
  async updatePost(
    id: number,
    updatePostDto: UpdatePostDto,
  ): Promise<UpdateResult> {
    const post = new Post();
    post.id = id;
    post.title = updatePostDto.title;
    post.content = updatePostDto.content;
    const result = await this.postRepository
      .createQueryBuilder()
      .update()
      .set(post)
      .where({ id })
      .execute();
    return result;
  }

  @HandleSqlError
  async removePost(id: number): Promise<DeleteResult> {
    return await this.postRepository
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .execute();
  }
}
