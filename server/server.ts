import express from 'express';
import { createPostHandler, listPostsHandler } from './handlers/postHandler';
import asyncHandler from 'express-async-handler';
import { initdb } from './datastore';
import { signUpHandler, singInHandler } from './handlers/authHandler';
import { requestLoggerMiddleware } from './middleware/loggerMiddleware';
import { errHandler } from './middleware/errorMiddleware';
import dotenv from 'dotenv';
import { authMiddleware } from './middleware/authMiddleware';

(async () => {
  await initdb();
  dotenv.config();
  const app = express();
  app.use(express.json());

  app.use(requestLoggerMiddleware);
  //Public endpoints
  app.get('/healthz', (req, res) => {
    res.send({ status: '✌️ ' });
  });
  app.post('/signup', asyncHandler(signUpHandler));
  app.post('/signin', asyncHandler(singInHandler));

  app.use(authMiddleware);
  //Protected endpoints
  app.get('/posts', asyncHandler(listPostsHandler));
  app.post('/posts', asyncHandler(createPostHandler));

  app.use(errHandler);
  app.listen(5000, () => {
    console.log('Listening on port 5000');
  });
})();
