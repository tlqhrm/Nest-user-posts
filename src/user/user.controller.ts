import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from './dto/signup.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiProperty,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('user')
@ApiTags('USER API')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @ApiOperation({
    summary: '회원가입 API',
    description: 'User를 생성한다.',
  })
  @ApiBody({
    schema: {
      example: {
        id: 'tlqhrm11',
        password: '1234',
        email: 'tlqhrm@naver.com',
        nickname: '159',
      },
    },
    required: true,
  })
  @ApiResponse({
    status: 201,
    description: '회원가입 성공',
    schema: {
      example: {
        id: 'tlqhrm11',
        email: 'tlqhrm@naver.com',
        nickname: '159',
        createdAt: '2022-10-28T01:23:42.014Z',
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: '이미 존재하는 아이디',
    schema: {
      example: {
        statusCode: 409,
        message: 'already exists',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: '잘못된 Request Body',
    schema: {
      example: {
        statusCode: 400,
        message: ['nickname must be a string'],
        error: 'Bad Request',
      },
    },
  })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @HttpCode(200)
  @Post('signin')
  @ApiOperation({
    summary: '로그인 API',
    description: '유저식별, jwt 반환',
  })
  @ApiBody({
    schema: {
      example: {
        id: 'tlqhrm',
        password: '1234',
      },
    },
    required: true,
  })
  @ApiOkResponse({
    description: '로그인 성공',
    schema: {
      example: {
        id: 'tlqhrm',
        email: 'tlqhrm@naver.com',
        nickname: '159',
        createdAt: '2022-10-27T04:58:36.451Z',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRscWhybSIsImlhdCI6MTY2Njk1NTgzNywiZXhwIjoxNjY2OTU5NDM3fQ.kM-a4Um2rRqB5zZDxcChoLr36jXF-imPdE5Rnu0SMDg',
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: '아이디 또는 비밀번호 틀림',
    schema: {
      example: {
        statusCode: 401,
        message: 'sgin in failed',
        error: 'Bad Request',
      },
    },
  })
  @ApiBadRequestResponse({
    description: '잘못된 Request Body',
    schema: {
      example: {
        statusCode: 400,
        message: ['password must be a string'],
        error: 'Bad Request',
      },
    },
  })
  signIn(@Body() signInDto: SignInDto) {
    return this.userService.signIn(signInDto);
  }

  @Get('posts/:page')
  @ApiOperation({
    summary: '내가 포스팅한 게시글 API',
    description:
      'jWT 필요<br>JWT payload의 id값과 같은 posts 반환 <br> 페이징 적용<br>total_count: 전체 개수 <br>isEnd: 마지막 페이지 확인여부<br> ',
  })
  @ApiParam({
    name: 'page',
    example: '1',
  })
  @ApiOkResponse({
    description: '불러오기 성공',
    schema: {
      example: {
        id: 'tlqhrm',
        email: 'tlqhrm@naver.com',
        nickname: '159',
        createdAt: '2022-10-27T04:58:36.451Z',
        total_count: '27',
        isEnd: false,
        posts: [
          {
            id: 33,
            title: '게시글1',
            content: '내용1',
            createdAt: '2022-10-27T22:01:56.821Z',
            updatedAt: '2022-10-27T22:01:56.821Z',
          },
          {
            id: 32,
            title: '게시글1',
            content: '내용1',
            createdAt: '2022-10-27T22:01:56.495Z',
            updatedAt: '2022-10-27T22:01:56.495Z',
          },
          {
            id: 31,
            title: '게시글1',
            content: '내용1',
            createdAt: '2022-10-27T22:01:56.166Z',
            updatedAt: '2022-10-27T22:01:56.166Z',
          },
          {
            id: 30,
            title: '게시글1',
            content: '내용1',
            createdAt: '2022-10-27T22:01:55.776Z',
            updatedAt: '2022-10-27T22:01:55.776Z',
          },
          {
            id: 29,
            title: '게시글1',
            content: '내용1',
            createdAt: '2022-10-27T22:01:55.426Z',
            updatedAt: '2022-10-27T22:01:55.426Z',
          },
          {
            id: 28,
            title: '게시글1',
            content: '내용1',
            createdAt: '2022-10-27T22:01:55.057Z',
            updatedAt: '2022-10-27T22:01:55.057Z',
          },
          {
            id: 27,
            title: '게시글1',
            content: '내용1',
            createdAt: '2022-10-27T22:01:54.702Z',
            updatedAt: '2022-10-27T22:01:54.702Z',
          },
          {
            id: 26,
            title: '게시글1',
            content: '내용1',
            createdAt: '2022-10-27T22:01:54.284Z',
            updatedAt: '2022-10-27T22:01:54.284Z',
          },
          {
            id: 25,
            title: '게시글1',
            content: '내용1',
            createdAt: '2022-10-27T22:01:53.863Z',
            updatedAt: '2022-10-27T22:01:53.863Z',
          },
          {
            id: 24,
            title: '게시글1',
            content: '내용1',
            createdAt: '2022-10-27T22:01:53.478Z',
            updatedAt: '2022-10-27T22:01:53.478Z',
          },
        ],
      },
    },
  })
  @ApiBadRequestResponse({
    description: '없는 페이지',
    schema: {
      example: {
        statusCode: 400,
        message: 'page does not exis',
        error: 'Bad Request',
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'JWT 인증 실패',
    schema: {
      example: {
        statusCode: 401,
        message: 'sgin in failed',
        error: 'Unauthorized',
      },
    },
  })
  @ApiBearerAuth('jwt')
  @UseGuards(AuthGuard())
  findAllPostById(@Param('page') page: string, @GetUser() user) {
    return this.userService.findAllPostById(+page, user['user']['id']);
  }
}
