import Account from '../models/account';
import jwt from 'jsonwebtoken';

export async function newUser(req, res) {
  try {
    const user = new Account({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: 'REGULAR',
    });

    await user.save();

    const payload = {id: user.id}; // id cannot change
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'defaultsecret');

    return res.json({message: "ok", token, user});
  } catch (err) {
    console.error(err);
    res.status(405).json({errors: [err]});
  }
}

export async function login(req, res) {
  const payload = {id: req.user.id}; // id cannot change
  const token = jwt.sign(payload, process.env.JWT_SECRET || "TESTONETWOTHREE", {
    expiresIn: 7200 // in seconds
  });
  return res.json({message: "ok", token, user: req.user});
}
