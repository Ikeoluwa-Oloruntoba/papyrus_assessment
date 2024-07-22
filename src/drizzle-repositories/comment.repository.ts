import { Inject, Injectable } from "@nestjs/common";
import { MySql2Database } from "drizzle-orm/mysql2";
import { DRIZZLE_CONNECTION } from "src/common/constants/drizzle.constant";
import { ICommentRepository } from "src/repository-interfaces/comment.interface";
import * as schema from '../drizzle/schema';
import { Comment } from "src/common/model.type";
import { eq } from "drizzle-orm";

@Injectable()
export class CommentRepository implements ICommentRepository {
  constructor(
    @Inject(DRIZZLE_CONNECTION) private readonly db: MySql2Database<typeof schema>,
  ) {}

  async create(comment: Partial<Comment>, userId: number) {
    const [createdComment] = await this.db.insert(schema.Comment).values({
        content: comment.content,
        userId: userId,
        postId: comment.postId
    });

  }

  async findById(id: number){
    const comment = await this.db.select().from(schema.Comment).where(eq(schema.Comment.id, id ));

    return comment;
  }

  async findAll(): Promise<Comment[]> {
    const comments = await this.db.select().from(schema.Comment);
    return comments;
  }

  async update(id: number, comment: Partial<Comment>){
    const [updatedComment] = await this.db.update(schema.Comment).set(comment).where(eq(schema.Comment.id, id ));
  
  }

  async delete(id: number): Promise<void> {
    await this.db.delete(schema.Comment).where(eq(schema.Comment.id, id ));
  }
}
