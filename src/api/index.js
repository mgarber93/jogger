import { Router } from 'express';
import passport from 'passport';
import { account, local } from './routes';

const router = Router();

router.use('/auth/local', local);
router.use('/api/accounts/', passport.authenticate('jwt', { session: false }), account);

export default router;

