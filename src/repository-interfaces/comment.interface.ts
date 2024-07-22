import { Comment } from "src/common/model.type";

export interface ICommentRepository {
    create(comment: Partial<Comment>,  userId: number);
    findById(id: number)
    findAll(): Promise<Comment[]>;
    update(id: number, comment: Partial<Comment>)
    delete(id: number): Promise<void>;
  }
  