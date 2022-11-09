import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { compareId } from 'src/auth/compare-id';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('post')
@ApiTags('POST API')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @ApiOperation({
    summary: '포스팅 API',
    description: 'jwt 필요<br>포스트를 생성한다.',
  })
  @ApiBody({
    schema: {
      example: {
        title: '게시글1',
        content: '내용1',
      },
    },
    required: true,
  })
  @ApiResponse({
    status: 201,
    description: '포스팅 성공',
    schema: {
      example: {
        title: '게시글1',
        content: '내용1',
        id: 41,
        createdAt: '2022-10-28T02:51:18.738Z',
        updatedAt: '2022-10-28T02:51:18.738Z',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: '잘못된 Request Body',
    schema: {
      example: {
        statusCode: 400,
        message: ['content must be a string'],
        error: 'Bad Request',
      },
    },
  })
  @ApiBearerAuth('jwt')
  @UseGuards(AuthGuard())
  createPost(@Body() createPostDto: CreatePostDto, @GetUser() user) {
    return this.postService.createPost(createPostDto, user.id);
  }

  @Get('all/:page')
  @ApiOperation({
    summary: '모든 게시물 조회 API',
    description:
      '페이징 적용<br>total_count: 전체 개수 <br>isEnd: 마지막 페이지 확인여부<br>',
  })
  @ApiParam({
    name: 'page',
    example: '1',
  })
  @ApiBody({
    schema: {
      example: {
        id: 'tlqhrm11',
        password: '1234',
        email: 'tlqhrm@naver.com',
        nickname: 159,
      },
    },
    required: true,
  })
  @ApiOkResponse({
    description: '조회 성공',
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
  findAllPost(@Param('page') page: string) {
    return this.postService.findAllPost(+page);
  }

  @Get(':id')
  @ApiOperation({
    summary: '게시글 조회 API',
    description: '게시글 id에 맞는 게시글 정보',
  })
  @ApiParam({
    name: 'id',
    example: '1',
  })
  @ApiOkResponse({
    description: '조회 성공',
    schema: {
      example: {
        id: 9,
        title: '게시글1',
        content: '내용1',
        createdAt: '2022-10-27T21:26:10.594Z',
        updatedAt: '2022-10-27T21:26:10.594Z',
        ownerId: 'tlqhrm',
      },
    },
  })
  @ApiBadRequestResponse({
    description: '없는 게시글',
    schema: {
      example: {
        statusCode: 400,
        message: 'post does not exist',
        error: 'Bad Request',
      },
    },
  })
  findAllMyPost(@Param('id') id: string) {
    return this.postService.findPostById(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '게시글 수정 API',
    description:
      'JWT 필요 <br> JWT payload의 id와 Request Body의 owunerId를 비교해 일치해야 가능',
  })
  @ApiParam({
    name: 'id',
    description: '게시글 id',
    example: '1',
  })
  @ApiBody({
    schema: {
      example: {
        title: '게시글 수정',
        content: '수정 내용',
        ownerId: 'tlqhrm',
      },
    },
    required: true,
  })
  @ApiOkResponse({
    description: '수정 성공',
    schema: {
      example: {
        id: 9,
        title: '게시글 수정',
        content: '수정 내용',
        createdAt: '2022-10-27T21:26:10.594Z',
        updatedAt: '2022-10-28T03:22:24.000Z',
        ownerId: 'tlqhrm',
      },
    },
  })
  @ApiBadRequestResponse({
    description: '잘못된 Request Body',
    schema: {
      example: {
        statusCode: 400,
        message: ['content must be a string'],
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
  @ApiForbiddenResponse({
    description: 'jwt id와 ownerId 불일치',
    schema: {
      example: {
        statusCode: 403,
        message: 'Fobidden',
      },
    },
  })
  @ApiBearerAuth('jwt')
  @UseGuards(compareId())
  @UseGuards(AuthGuard())
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.updatePost(+id, updatePostDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '게시글 삭제 API',
    description:
      'JWT 필요 <br> JWT payload의 id와 Request Body의 owunerId를 비교해 일치해야 가능',
  })
  @ApiParam({
    name: 'id',
    description: '게시글 id',
    example: '1',
  })
  @ApiBody({
    schema: {
      example: {
        ownerId: 'tlqhrm',
      },
    },
    required: true,
  })
  @ApiOkResponse({
    description: '삭제 성공',
    schema: {
      example: 'post id: 1 is deleted',
    },
  })
  @ApiBadRequestResponse({
    description: '잘못된 Request Body',
    schema: {
      example: {
        statusCode: 400,
        message: ['ownerId must be a string'],
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
  @ApiForbiddenResponse({
    description: 'jwt id와 ownerId 불일치',
    schema: {
      example: {
        statusCode: 403,
        message: 'Fobidden',
      },
    },
  })
  @ApiBearerAuth('jwt')
  @UseGuards(compareId())
  @UseGuards(AuthGuard())
  remove(@Param('id') id: string) {
    return this.postService.removePost(+id);
  }
}
