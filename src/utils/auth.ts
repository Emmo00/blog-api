import config from '../config';
import { sign, verify } from 'jsonwebtoken';
import { JWTPayload } from '../types';
import { hash } from 'bcrypt';

export function generateToken(userId: string): string {
  return sign({ userId }, config.secret);
}

export function legitToken(token: string): boolean {
  try {
    verify(token, config.secret);
    return true;
  } catch (err) {
    return false;
  }
}

export function decodeToken(token: string): JWTPayload {
  if (legitToken(token)) {
    return verify(token, config.secret) as JWTPayload;
  }
  throw new Error('Invalid Token');
}

export function hashPassword(password: string) {
  return hash(password, 10);
}
