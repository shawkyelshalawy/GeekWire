import { json } from 'express';
import { jwtObject } from './types';
import jwt from 'jsonwebtoken';
export function signJwt(obj: jwtObject): string {
  return jwt.sign(obj, getJwtSecret(), {
    expiresIn: '30d',
  });
}

export function verifyJwt(token: string): jwtObject {
  return jwt.verify(token, getJwtSecret()) as jwtObject;
}

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.log('Missing jwt secret!!!!');
    process.exit(1);
  }
  return secret;
}
