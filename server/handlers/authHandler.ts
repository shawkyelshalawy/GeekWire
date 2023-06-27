import crypto from 'crypto';
import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from '../api';
import { db } from '../datastore';
import { User, ExpressHandler } from '../types';
import { signJwt } from '../auth';

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
  if (!existing || existing.password !== hashPassword(password!)) {
    return res.status(403);
  }
  const jwt = signJwt({ userId: existing.id });
  return res.status(200).send({
    user: {
      email: existing.email,
      username: existing.username,
      firstName: existing.firstName,
      lastName: existing.lastName,
      id: existing.id,
    },
    jwt,
  });
};
export const signUpHandler: ExpressHandler<
  SignUpRequest,
  SignUpResponse
> = async (req, res) => {
  const { email, firstName, lastName, password, username } = req.body;
  if (!email || !username || !password || !firstName || !lastName) {
    return res.status(400).send({ error: 'All fields are required' });
  }

  if (await db.getUserByEmail(email)) {
    return res.status(403).send({ error: 'User already exists' });
  }
  if (await db.getUserByUserName(username)) {
    return res.status(403).send({ error: 'User already exists' });
  }
  const user: User = {
    id: crypto.randomUUID(),
    email,
    firstName: firstName ?? '',
    lastName: lastName ?? '',
    username: username,
    password: hashPassword(password),
  };
  await db.createUser(user);
  const jwt = signJwt({ userId: user.id });
  return res.status(200).send({ jwt });
};

function hashPassword(password: string): string {
  return crypto
    .pbkdf2Sync(password, process.env.PASSWORD_SALT!, 42, 12, 'sha512')
    .toString('hex');
}
