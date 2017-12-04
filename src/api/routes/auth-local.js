import express from 'express';
import { passport } from '../middleware/index'

import { newUser, login } from '../controllers/auth-local';

const router = express.Router();

router.post('/register', newUser);
router.post('/login', passport.authenticate('local-login'), login);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

export default router;
