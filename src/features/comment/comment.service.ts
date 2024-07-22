import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/createComment.dto';
import { CommentRepository } from 'src/drizzle-repositories/comment.repository';

@Injectable()
export class CommentService {

    constructor(private readonly commentsRepository: CommentRepository) {}

    async create(data: CreateCommentDto, userId: number){

        return await this.commentsRepository.create(data, userId)
    }
}
