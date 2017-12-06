import Account from '../models/account';

function sanitize(doc) {
  doc.salt = undefined;
  doc.hash = undefined;
  delete doc.salt;
  delete doc.hash;
  return doc;
}

export function getAllManagables(req, res) {
  console.log('managables', req.body);
  res.sendStatus(200);
}

export function getAccount(req, res) {
  return Account.findById(req.params.accountId)
    .then(account => {
      res.json(sanitize(account));
    })
    .catch(err => {
      res.status(405).json({errors: [err]});
    });
}

export function updateAccount(req, res) {
  return Account.findByIdAndUpdate(req.params.accountId, req.body)
    .then(account => {
      res.json({ message: 'Account updated!', account: sanitize(account) });
    })
    .catch(err => {
      res.status(405).json({errors: [err]});
    });
}

export function deleteAccount(req, res) {
  return Account.remove({ _id: req.params.accountId })
    .then(result => {
      res.json({ message: 'Account deleted!', result });
    })
    .catch(err => {
      res.json({errors: [err]});
    });
}
