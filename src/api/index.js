import { Router } from 'express';
import { account, local } from './routes';

const router = Router();

router.use('/auth/local', local);
router.use('/api/accounts/', account);

export default router;

