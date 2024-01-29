import type { Request, Response } from 'express';
import { Article, User } from '../models';
import { NewArticlePayload } from '../types';

export async function postArticle(req: Request, res: Response) {
  const { content, title } = req.body as NewArticlePayload;
  if (!content || !title) {
    return res.status(400).json({ error: 'BAD REQUEST' });
  }
  const author = res.locals.user.username;
  const article = await Article.create({ author, content, title });
  return res.status(201).json({ message: 'Article created', data: article });
}

export async function getArticle(req: Request, res: Response) {
  const articleId = req.params.id;
  let article;
  try {
    article = await Article.findById(articleId);
  } catch (error) {
    return res.status(404).json({ error: 'NOT FOUND' });
  }
  if (!article) {
    return res.status(404).json({ error: 'NOT FOUND' });
  }
  return res.json({ data: article });
}

export async function getArticles(req: Request, res: Response) {
  const page = req.query.page || 1;
  const options = {
    page: Number(page),
    limit: 10,
    collation: {
      locale: 'en',
    },
  };
  await Article.paginate({}, options, (err, result) => {
    return res.json({ message: 'Articles', data: result.docs });
  });
}

export async function putArticle(req: Request, res: Response) {
  const articleId = req.params.id;
  const { content, title } = req.body as NewArticlePayload;

  let article;
  try {
    article = await Article.findById(articleId);
  } catch (error) {
    return res.status(404).json({ error: 'NOT FOUND' });
  }
  if (!article) return res.status(404).json({ error: 'NOT FOUND' });
  if (content) article.content = content;
  if (title) article.title = title;
  await article.save();
  return res.json({ message: 'Article updated' });
}

export async function deleteArticle(req: Request, res: Response) {
  const id = req.params.id;
  try {
    await Article.deleteOne({ _id: id });
  } catch (err) {
    console.error(err);
  }
  return res.json({ message: 'Article deleted' });
}
