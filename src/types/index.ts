import mongoose from 'mongoose';
export interface Config {
  port: string;
  mongo_url: string;
  secret: string;
}
export interface Article {
  title: string;
  content: string;
  author: string;
  timestamp: Date;
}

export interface ArticleModel extends mongoose.Document, Article {}

export interface User {
  username: string;
  password: string;
  email: string;
}

export interface UserMethods {
  comparePassword: (password: string) => boolean;
}

export interface UserModel extends mongoose.Document, User, UserMethods {}

export interface JWTPayload {
  userId: string;
}

export interface LoginPayload {
  username?: string;
  password?: string;
}

export interface SignupPayload extends LoginPayload {
  email?: string;
}

export interface NewArticlePayload extends Omit<Article, 'author'> {}
