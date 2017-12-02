import { Router } from 'express';
import { account } from './routes';

const router = Router();

router.use('/accounts/', account);

export default router;

