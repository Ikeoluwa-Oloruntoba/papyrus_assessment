import { Inject, Injectable } from "@nestjs/common";
import { MySql2Database } from "drizzle-orm/mysql2";
import { DRIZZLE_CONNECTION } from "src/common/constants/drizzle.constant";
import { IPostRepository } from "src/repository-interfaces/post.interface";
import * as schema from '../drizzle/schema';
import { Post } from "src/common/model.type";
import { eq } from "drizzle-orm";

@Injectable()
export class PostRepository implements IPostRepository {

constructor(
    @Inject(DRIZZLE_CONNECTION) private readonly db: MySql2Database<typeof schema>,
    ) {}


  async create(post: Partial<Post>, userId: number){
    const [createdPost] = await this.db.insert(schema.Post).values({
        content: post.content,
        title: post.title,
        userId: userId
    })
    return createdPost;
  }

  async findById(id: number): Promise<Post | null> {
    const [post] = await this.db.select().from(schema.Post).where(eq(schema.Post.id, id ));
    return post;
  }

  async findAll(): Promise<Post[]> {
    const posts = await this.db.select().from(schema.Post);
    return posts;
  }

  async findAllForUser(userId: number): Promise<Post[]> {
    const posts = await this.db.select().from(schema.Post).where(eq(schema.Post.userId, userId ));
    return posts;
  }

//   async update(id: number, post: Partial<Post>): Promise<Post> {
//     const [updatedPost] = await this.db.update('posts').set(post).where({ id }).returning('*');
//     return updatedPost;
//   }

//   async delete(id: number): Promise<void> {
//     await this.db.delete('posts').where({ id });
//   }
}
