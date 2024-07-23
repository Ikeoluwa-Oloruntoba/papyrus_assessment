import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { PostService } from './post.service';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { DtoValidator } from 'src/helpers/dtoValidator.helper';
import { CreatePostDto } from './dto/createPost.dto';
import { GetCurrentUser } from 'src/common/decorators';
import { UserGuard } from 'src/common/guards';
import { FetchPostDto } from './dto/fetchPost.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod.validation';
import { createPostSchema, CreatePostZod } from './dto/post.zod';

@ApiTags('Posts')
@Controller({
  path: 'post',
  version: '1'
})
export class PostController {
  constructor(
    private readonly postService: PostService) {}




  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a User' })
  @ApiBody({ type: CreatePostDto })
  @UseGuards(UserGuard)
  @UsePipes(new ZodValidationPipe(createPostSchema))
  async createPost(@Body() data: CreatePostZod, @GetCurrentUser('sub') userId: number) {

      // Create user
      const newPost = await this.postService.create(data, userId);
  
      return {
        message: "Post Created Successfully",
        data: newPost
      };
   
  }


  @Get('user/get')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Post for a User' })
  @UseGuards(UserGuard)
  @UsePipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true
    }
  }))
  async getPostForUser(@Query() data: FetchPostDto, @GetCurrentUser('sub') userId: number) {

      // Create user
      const posts = await this.postService.fetchUserPost(data, userId);
  
      return {
        message: "User Post Fetched Successfully",
        data: posts
      };
   
  }

  
  @Get('get')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get All Posts' })
  @UsePipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true
    }
  }))
  async getPost(@Query() data: FetchPostDto) {

      // Create user
      const posts = await this.postService.fetchPosts(data);
  
      return {
        message: "Posts Fetched Successfully",
        data: posts
      };
   
  }


  @Get('get/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Single Post' })
  async getSinglePost(@Param('id') id: number){

    const post =  await this.postService.fetchPostById(id)

      
    return {
      message: "Post Fetched Successfully",
      data: post
    };
  }

}
