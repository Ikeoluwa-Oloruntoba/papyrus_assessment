import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/createPost.dto';
import { FetchPostDto } from './dto/fetchPost.dto';
import { PostRepository } from 'src/drizzle-repositories/post.repository';
import { CreatePostZod } from './dto/post.zod';

@Injectable()
export class PostService {

    constructor(private readonly postsRepository: PostRepository) {}

    async create(data: CreatePostZod, userId:number){

        return await this.postsRepository.create(data, userId)
    }

    async fetchPosts(data: FetchPostDto){

        const { page, pageSize, search} = data

        return await this.postsRepository.findAll();
    }

    async fetchUserPost(data: FetchPostDto, userId: number){

        const { page, pageSize, search} = data

        return await this.postsRepository.findAllForUser(userId);
    }



    async fetchPostById(id: number){

    
        return await this.postsRepository.findById(id);
    }

}
