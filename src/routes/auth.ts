import { Router } from 'express';
import { signIn, signUp } from '../controllers/auth';

const router = Router();

router.post('/auth/register', signUp);
router.post('/auth/login', signIn);

export default router;
