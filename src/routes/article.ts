import { Router } from 'express';
import {
  deleteArticle,
  getArticle,
  getArticles,
  postArticle,
  putArticle,
} from '../controllers/article';
import { isLoggedIn } from '../middleware/auth';

const router = Router();

router.get('/articles', getArticles);
router.get('/articles/:id', getArticle);

router.post('/articles', isLoggedIn, postArticle);

router.put('/articles/:id', isLoggedIn, putArticle);

router.delete('/articles/:id', isLoggedIn, deleteArticle);

export default router;
