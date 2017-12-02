import Account, { Jog } from '../models/account';

// http://mongoosejs.com/docs/subdocs.html

export async function newJog(req, res) {
  const acc = await Account.findById(String(req.params.accountId));
  if (acc) {
    try {
      const jog = new Jog({
        date: req.body.date,
        distance: Number(req.body.distance),
        distanceFormat: req.body.distanceFormat,
        time: Number(req.body.time),
        timeFormat: req.body.timeFormat,
      });
      acc.jogs.unshift(jog);
      await acc.save();
      return res.status(201).json(jog);
    } catch (e) {
      console.error(e);
      return res.status(405).json({errors: [e]});
    }
  } else {
    // not authorized
    res.sendStatus(401);
  }
}
export async function getJog(req, res) {
  try {
    const account = await Account.findById(String(req.params.accountId));
    const jog = account.jogs.id(String(req.params.jogId));
    return res.json(jog);
  } catch (e) {
    console.error(e);
    res.sendStatus(405);
  }
}
export async function updateJog(req, res) {
  try {
    const account = await Account.findById(String(req.params.accountId));
    const jog = account.jogs.id(String(req.params.jogId));
    jog.set(req.body);
    await account.save();
    return res.json(req.body);
  } catch (e) {
    console.error(e);
    return res.sendStatus(405);
  }
}
export async function deleteJog(req, res) {
  try {
    const account = await Account.findById(req.params.accountId);
    await account.jogs.id(req.params.jogId).remove();
    account.save();
    res.sendStatus(202);
  } catch (e) {
    console.error(e);
    res.status(405).json({errors: [e]});
  }
}
