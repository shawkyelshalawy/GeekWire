import crypto from 'crypto';
import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from '../api';
import { db } from '../datastore';
import { User, ExpressHandler } from '../types';

export const singInHandler: ExpressHandler<
  SignInRequest,
  SignInResponse
> = async (req, res) => {
  const { login, password } = req.body;
  if (!login || !password) {
    res.sendStatus(400);
  }
  const existing =
    (await db.getUserByEmail(login!)) || (await db.getUserByUserName(login!));
  if (!existing || existing.password !== password) {
    return res.status(403);
  }
  return res.status(200).send({
    email: existing.email,
    username: existing.username,
    firstName: existing.firstName,
    lastName: existing.lastName,
    id: existing.id,
  });
};
export const signUpHandler: ExpressHandler<
  SignUpRequest,
  SignUpResponse
> = async (req, res) => {
  const { email, firstName, lastName, password, username } = req.body;
  if (!email || !username || !password || !firstName || !lastName) {
    return res.status(400).send('All fields are required');
  }

  if (await db.getUserByEmail(email)) {
    return res.status(403);
  }
  if (await db.getUserByUserName(username)) {
    return res.status(403);
  }

  const user: User = {
    id: crypto.randomUUID(),
    email,
    firstName: firstName ?? '',
    lastName: lastName ?? '',
    username: username,
    password,
  };
  await db.createUser(user);
  return res.sendStatus(200);
};
