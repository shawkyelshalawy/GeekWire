import { RequestHandler } from 'express-serve-static-core';
import { db } from '../datastore';
import { ExpressHandler, Post } from '../types';
import crypto from 'crypto';
import {
  ListPostsRequest,
  ListPostsResponse,
  createPostRequest,
  createPostResponse,
} from '../api';

export const listPostsHandler: ExpressHandler<
  ListPostsRequest,
  ListPostsResponse
> = async (_request, response) => {
  response.send({ posts: await db.listPosts() });
};

export const createPostHandler: ExpressHandler<
  createPostRequest,
  createPostResponse
> = async (req, res) => {
  if (!req.body.title || !req.body.url) {
    return res.sendStatus(400);
  }
  const post: Post = {
    id: crypto.randomUUID(),
    postedAt: Date.now(),
    title: req.body.title,
    url: req.body.url,
    userId: res.locals.userId,
  };
  await db.createPost(post);
  res.sendStatus(200);
};
