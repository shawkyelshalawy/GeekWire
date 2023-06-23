import { DataStore } from '..';
import { User, Post, Comment, Like } from '../../types';

export class InMemoryDataStore implements DataStore {
  private users: User[] = [];
  private comments: Comment[] = [];
  private posts: Post[] = [];
  private likes: Like[] = [];
  createUser(user: User): Promise<void> {
    this.users.push(user);
    return Promise.resolve();
  }
  getUserById(id: string): Promise<User | undefined> {
    return Promise.resolve(this.users.find((u) => u.id === id));
  }
  getUserByEmail(email: string): Promise<User | undefined> {
    return Promise.resolve(this.users.find((u) => u.email === email));
  }
  listPosts(): Promise<Post[]> {
    return Promise.resolve(this.posts);
  }
  createPost(post: Post): Promise<void> {
    this.posts.push(post);
    return Promise.resolve();
  }
  getPost(id: string): Promise<Post | undefined> {
    return Promise.resolve(this.posts.find((p) => p.id === id));
  }
  deletePost(id: string): Promise<void> {
    const index = this.posts.findIndex((p) => p.id === id);
    if (index === -1) {
      return Promise.resolve();
    }
    this.posts.splice(index, 1);
    return Promise.resolve();
  }
  listComments(postId: string): Promise<Comment[]> {
    return Promise.resolve(this.comments.filter((c) => c.postId == postId));
  }
  createComment(comment: Comment): Promise<void> {
    this.comments.push(comment);
    return Promise.resolve();
  }
  deleteComment(id: string): Promise<void> {
    const index = this.comments.findIndex((c) => c.id === id);
    if (index === -1) {
      return Promise.resolve();
    }
    this.comments.splice(index, 1);
    return Promise.resolve();
  }
  createLike(like: Like): Promise<void> {
    this.likes.push(like);
    return Promise.resolve();
  }
}
