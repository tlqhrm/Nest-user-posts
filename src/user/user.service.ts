import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto, ReturnCreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { ReturnSignInDto, SignInDto } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { PostRepository } from 'src/post/post.repository';
import { UserPostsDto } from './dto/user-posts';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private postRepository: PostRepository,
    private jwtService: JwtService,
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<ReturnCreateUserDto> {
    const { password } = createUserDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    createUserDto.password = hashedPassword;

    const user = await this.userRepository.createUser(createUserDto);

    delete user.password;

    return user;
  }

  async signIn(signInDto: SignInDto): Promise<ReturnSignInDto> {
    const { id, password } = signInDto;

    const user = await this.userRepository.getUserById(id);
    if (!user) throw new UnauthorizedException('sgin in failed');
    if (await bcrypt.compare(password, user.password)) {
      const payload = { id };
      console.log(process.env.JWT_SECRET);
      const accessToken = this.jwtService.sign(payload);
      delete user['password'];
      return {
        id: user.id,
        email: user.email,
        nickname: user.nickname,
        createdAt: user.createdAt,
        token: accessToken,
      };
    } else throw new UnauthorizedException('sgin in failed');
  }

  async findAllPostById(page: number, id: string): Promise<UserPostsDto> {
    const viewCount = 10;
    const start = (page - 1) * viewCount;
    const user = await this.userRepository.findAllPostById(
      viewCount,
      start,
      id,
    );
    if (!user) throw new BadRequestException('page does not exis');
    const totalCount = await this.postRepository.getPostTotalCountById(id);
    delete user['password'];
    const { email, nickname, createdAt, posts } = user;
    return {
      id,
      email,
      nickname,
      createdAt,
      total_count: totalCount,
      isEnd: totalCount - viewCount * page <= 0 ? true : false,
      posts,
    };
  }
}
