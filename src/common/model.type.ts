// src/types/models.ts

export interface User {
    id: number;
    uuid: string;
    fullname: string;
    email: string;
    password: string;
    status: boolean;
    posts?: Post[];
    tokens?: UserAccessToken[];
    comments?: Comment[];
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Post {
    id: number;
    uuid: string;
    title: string;
    content: string;
    user?: User;
    userId: number;
    comments?: Comment[];
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Comment {
    id: number;
    uuid?: string;
    content?: string;
    post?: Post;
    postId?: number;
    user?: User;
    userId?: number;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface UserAccessToken {
    id: number;
    uuid: string;
    accessToken: string;
    user?: User;
    userId: number;
    createdAt: Date;
    revoked: boolean;
  }
  