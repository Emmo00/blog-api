import type { Request, Response } from 'express';
import { LoginPayload, SignupPayload } from '../types';
import User from '../models/user';
import { generateToken, hashPassword } from '../utils/auth';

export async function signUp(req: Request, res: Response) {
  if (!req.body) {
    return res.status(400).json({ error: 'BAD REQUEST' });
  }
  const { password, username, email } = req.body as SignupPayload;
  if (!username || !password || !email) {
    return res.status(400).json({ error: 'BAD REQUEST' });
  }
  const hashedPassword = await hashPassword(password);
  await User.create({ username, password: hashedPassword, email });
  return res.status(201).json({ message: 'User created' });
}

export async function signIn(req: Request, res: Response) {
  if (!req.body) {
    return res.status(400).json({ error: 'BAD REQUEST' });
  }
  const { username, password } = req.body as LoginPayload;
  if (!username || !password) {
    return res.status(400).json({ error: 'username and password required' });
  }
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ error: 'username or password incorrect' });
  }
  if (!user.comparePassword(password)) {
    return res.status(401).json({ error: 'username or password incorrect' });
  }
  return res.json({ message: 'User logged in', data: generateToken(user.id) });
}
