//types

// Post APIs
import { Post, User } from './types';
export interface ListPostsRequest {}
export interface ListPostsResponse {
  posts: Post[];
}
export type createPostRequest = Pick<Post, 'title' | 'url' | 'userId'>;
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

export interface SignUpResponse {}
export interface SignInRequest {
  login: string;
  password: string;
}

export type SignInResponse = Pick<
  User,
  'email' | 'firstName' | 'lastName' | 'username' | 'id'
>;
