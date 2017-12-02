import passport from 'passport';
import Account from '../models/account';

function sanitize(doc) {
  doc.salt = undefined;
  doc.hash = undefined;
  delete doc.salt;
  delete doc.hash;
  return doc;
}

export function newUser(req, res) {
  const newAccount = new Account({
    username: req.body.username,
    email: req.body.email,
    role: req.body.role
  });
  Account.register(newAccount, req.body.password, (err, account) => {
    if (err) {
      console.error(err);
      res.status(405).json({errors: [err]});
    } else {
      passport.authenticate('local')(req, res, () => {
        res.status(201).json(sanitize(req.user));
      });
    }
  });
}

export function sendUser(req, res) {
  res.json(sanitize(req.user));
}
