import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './drizzle/drizzle.module';
import { DrizzleRepositoryModule } from './drizzle-repositories/repository.module';
import { UserModule } from './features/user/user.module';
import { AuthModule } from './features/auth/auth.module';
import { PostModule } from './features/post/post.module';
import { CommentModule } from './features/comment/comment.module';
import { HelperModule } from './helpers/helper.module';

@Module({
  imports: [DrizzleModule, DrizzleRepositoryModule, UserModule, AuthModule, PostModule, CommentModule, HelperModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
