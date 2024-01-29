import type { Request, Response, NextFunction } from 'express';
import { User as UserInterface, UserModel } from '../types';
import { legitToken, decodeToken } from '../utils/auth';
import User from '../models/user';

export async function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'FORBIDDEN' });
  }
  if (authHeader.split(' ').length !== 2) {
    return res.status(401).json({ error: 'FORBIDDEN' });
  }
  const token = authHeader.split(' ')[1];
  if (!legitToken(token)) {
    return res.status(401).json({ error: 'FORBIDDEN' });
  }
  const userId = decodeToken(token).userId;
  const user = await User.findById(userId);
  res.locals.user = user as any as UserModel;
  return next();
}
