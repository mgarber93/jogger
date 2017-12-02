import express from 'express';
import passport from 'passport';

import { newUser, sendUser } from '../controllers/auth-local';

const router = express.Router();

router.post('/register', newUser);
router.post('/login', passport.authenticate('local'), sendUser);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

export default router;
