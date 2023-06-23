import { CommentDao } from './dao/CommentDao';
import { PostDao } from './dao/PostDao';
import { UserDao } from './dao/UserDao';
import { LikeDao } from './dao/LikeDao';
import { sqlDataStore } from './sql';
// import { InMemoryDataStore } from './memorydb';
export interface DataStore extends UserDao, PostDao, CommentDao, LikeDao {}

export let db: DataStore;

export async function initdb() {
  // db = new InMemoryDataStore();
  db = await new sqlDataStore().openDb();
}
