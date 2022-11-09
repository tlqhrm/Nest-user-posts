import { Inject, Injectable } from '@nestjs/common';
import { HandleSqlError } from 'src/handleSqlError.decorator';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
  ) {}

  @HandleSqlError
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { id, password, email, nickname } = createUserDto;
    const user = new User();
    user.id = id;
    user.password = password;
    user.email = email;
    user.nickname = nickname;

    await this.userRepository
      .createQueryBuilder()
      .insert()
      .into('user')
      .values(user)
      .execute();

    return user;
  }

  @HandleSqlError
  async getUserById(id: string): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  @HandleSqlError
  async findAllPostById(
    viewCount: number,
    start: number,
    id: string,
  ): Promise<User> {
    const result = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.posts', 'post')
      .where('user.id = :id', { id })
      .orderBy('post.id', 'DESC')
      .limit(viewCount)
      .offset(start)
      .getMany();
    console.log(result);
    return result[0];
  }
}
