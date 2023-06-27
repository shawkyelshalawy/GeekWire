import { ErrorRequestHandler } from 'express';

export const errHandler: ErrorRequestHandler = (err, _req, res) => {
  console.log('Uncaught Exception:', err);
  res.status(500).send('Oops , unexpected error occcured, please try again');
};
