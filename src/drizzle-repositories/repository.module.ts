import { Global, Module } from "@nestjs/common";
import { CommentRepository } from "./comment.repository";
import { UserAccessTokenRepository } from "./user-token.repository";
import { UserRepository } from "./user.repository";
import { PostRepository } from "./post.repository";

@Global()
@Module({
    providers: [
       CommentRepository, UserAccessTokenRepository, UserRepository, PostRepository
    ],
    exports: [
        CommentRepository, UserAccessTokenRepository, UserRepository, PostRepository
    ]
})

export class DrizzleRepositoryModule {}