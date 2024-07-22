import { Post } from "src/common/model.type";

export interface IPostRepository {

    create(post: Partial<Post>, userId: number);
    findById(id: number): Promise<Post | null>;
    findAll(): Promise<Post[]>;
    // update(id: number, post: Partial<Post>);
    // delete(id: number): Promise<void>;

  }