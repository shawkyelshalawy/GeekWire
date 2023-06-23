import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

import { DataStore } from '..';
import { User, Post, Comment, Like } from '../../types';
import path from 'path';
export class sqlDataStore implements DataStore {
  public async openDb() {
    const db = await open({
      filename: path.join(__dirname, 'GeekWire.sqlite'),
      driver: sqlite3.Database,
    });
    await db.migrate({
      migrationsPath: path.join(__dirname, 'migrations'),
    });
    return this;
  }
  createUser(user: User): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getUserById(id: string): Promise<User | undefined> {
    throw new Error('Method not implemented.');
  }
  getUserByEmail(email: string): Promise<User | undefined> {
    throw new Error('Method not implemented.');
  }
  listPosts(): Promise<Post[]> {
    throw new Error('Method not implemented.');
  }
  createPost(post: Post): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getPost(id: string): Promise<Post | undefined> {
    throw new Error('Method not implemented.');
  }
  deletePost(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  listComments(postId: string): Promise<Comment[]> {
    throw new Error('Method not implemented.');
  }
  createComment(comment: Comment): Promise<void> {
    throw new Error('Method not implemented.');
  }
  deleteComment(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  createLike(like: Like): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
