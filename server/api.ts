//types

// Post APIs
import { Post, User } from './types';
export interface ListPostsRequest {}
export interface ListPostsResponse {
  posts: Post[];
}
export type createPostRequest = Pick<Post, 'title' | 'url'>;
export interface createPostResponse {}

export interface getPostRequest {}
export interface getPostResponse {
  post: Post;
}

// Comment APIs

// Like APIs

// User APIs

export type SignUpRequest = Pick<
  User,
  'email' | 'firstName' | 'lastName' | 'username' | 'email' | 'password'
>;

export interface SignUpResponse {
  jwt: string;
}
export interface SignInRequest {
  login: string;
  password: string;
}

export type SignInResponse = {
  user: Pick<User, 'email' | 'firstName' | 'lastName' | 'username' | 'id'>;
  jwt: string;
};
