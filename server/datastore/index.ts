import { CommentDao } from './dao/CommentDao';
import { PostDao } from './dao/PostDao';
import { UserDao } from './dao/UserDao';
import { LikeDao } from './dao/LikeDao';
import { InMemoryDataStore } from './memorydb';
export interface DataStore extends UserDao, PostDao, CommentDao, LikeDao {}

export const db = new InMemoryDataStore();
