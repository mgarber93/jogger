import jwt from 'jsonwebtoken';

export async function newUser(req, res) {
  const payload = {id: req.user.id}; // id cannot change
  const token = jwt.sign(payload, process.env.JWT_SECRET || "TESTONETWOTHREE", {
    expiresIn: 7200 // in seconds
  });
  return res.json({message: "ok", token, user: req.user});
}

export async function login(req, res) {
  const payload = {id: req.user.id}; // id cannot change
  const token = jwt.sign(payload, process.env.JWT_SECRET || "TESTONETWOTHREE", {
    expiresIn: 7200 // in seconds
  });
  return res.json({message: "ok", token, user: req.user});
}
