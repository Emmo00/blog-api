import { Router } from 'express';
import authRouter from './auth';
import articleRouter from './article';

const router = Router();

router.use(authRouter);
router.use(articleRouter);

export default router;
