import express, { ErrorRequestHandler, RequestHandler } from 'express';
import { createPostHandler, listPostsHandler } from './handlers/postHandler';
import asyncHandler from 'express-async-handler';

const app = express();
app.use(express.json());

const requestLoggerMiddleware: RequestHandler = (req, _res, next) => {
  console.log(req.method, req.path, '-body :', req.body);
  next();
};

app.use(requestLoggerMiddleware);
app.get('/posts', asyncHandler(listPostsHandler));
app.post('/posts', asyncHandler(createPostHandler));

const errHandler: ErrorRequestHandler = (err, _req, res) => {
  console.log('Uncaught Exception:', err);
  res.status(500).send('Oops , unexpected error occcured, please try again');
};
app.use(errHandler);
app.listen(4000, () => {
  console.log('Listening on port 4000');
});
