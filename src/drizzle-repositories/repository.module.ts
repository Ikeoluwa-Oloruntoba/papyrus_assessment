import { Global, Module } from "@nestjs/common";
import { CommentRepository } from "./comment.repository";
import { UserAccessTokenRepository } from "./user-token.repository";
import { UserRepository } from "./user.repository";

@Global()
@Module({
    providers: [
       CommentRepository, UserAccessTokenRepository, UserRepository
    ],
    exports: [
        CommentRepository, UserAccessTokenRepository, UserRepository
    ]
})

export class DrizzleRepositoryModule {}