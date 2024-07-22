// src/drizzle/schema.ts
import { mysqlTable, mysqlSchema, varchar, int, boolean, timestamp } from "drizzle-orm/mysql-core";
import { relations, sql } from 'drizzle-orm';

export const mySchema = mysqlSchema("my_schema")

export const User = mysqlTable('users', {
  id: int('id').primaryKey().autoincrement(),
  uuid: varchar('uuid', { length: 36 }).unique(),
  fullname: varchar('fullname', { length: 256 }).notNull(),
  email: varchar('email', { length: 256 }).unique().notNull(),
  password: varchar('password',{ length: 256 }).notNull(),
  status: boolean('status').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

export const Post = mysqlTable('posts', {
  id: int('id').primaryKey().autoincrement(),
  uuid: varchar('uuid', { length: 36 }).unique(),
  title: varchar('title', { length: 256 }).notNull(),
  content: varchar('content', { length: 10000 }).notNull(),
  userId: int('user_id').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

export const Comment = mysqlTable('comments', {
  id: int('id').primaryKey().autoincrement(),
  uuid: varchar('uuid', { length: 36 }).unique(),
  content: varchar('content', { length: 10000 }).notNull(),
  postId: int('post_id').notNull(),
  userId: int('user_id').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

export const UserAccessToken = mysqlTable('user_access_tokens', {
  id: int('id').primaryKey().autoincrement(),
  uuid: varchar('uuid', { length: 36 }).unique(),
  accessToken: varchar('access_token', { length: 255 }).unique().notNull(),
  userId: int('user_id').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  revoked: boolean('revoked').default(false),
});

// Define relations
export const usersRelations = relations(User, ({ many }) => ({
    posts: many(Post),
  }));

export const postsRelations = relations(Post, ({ one, many }) => ({
author: one(User, {
    fields: [Post.userId],
    references: [User.id],
}),
comments: many(Comment)
}));

export const commentsRelations = relations(Comment, ({ one }) => ({
    post: one(Post, {
      fields: [Comment.postId],
      references: [Post.id],
    }),
  }));

export const tokenRelations = relations(UserAccessToken, ({ one }) => ({
    user: one(User, {
        fields: [UserAccessToken.userId],
        references: [User.id]
    })
}))



export type UserAccessTokenModel = typeof UserAccessToken.$inferInsert;