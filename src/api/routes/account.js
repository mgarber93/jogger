import express from 'express';

import { getAccount, updateAccount, deleteAccount, getAllManagables } from '../controllers/account';
import { getJog, newJog, updateJog, deleteJog } from '../controllers/jogs';

const router = express.Router();

/*
 * Admin can CRUD users
 */
function hasManagerRights(req, res, next) {
  // user has full CRUD on their own data
  if (!req.user) {
    res.status(401).json({errors: {auth: 'You must be logged in!'}});
  } else if (String(req.params.accountId) === String(req.user._id)) {
    next();
  } else if (req.user && ['MANAGER', 'ADMIN'].includes(req.user.role)) {
    next();
  } else {
    res.status(403).json({errors: {auth: 'You must have manager rights!'}});
  }
}

/*
 * Admin can CRUD user + jog
 */
function hasAdminRights(req, res, next) {
  // user has full CRUD on their own data
  if (!req.user) {
    res.status(401).json({errors: {auth: 'You must be logged in!'}});
  } else if (String(req.params.accountId) === String(req.user._id)) {
    next();
  } else if (req.user && req.user.role === 'ADMIN') {
    next();
  } else {
    res.status(403).json({errors: {auth: 'You must have admin rights!'}});
  }
}

router.route('/')
  .all(hasManagerRights)
  .get(getAllManagables);

router.route('/:accountId')
  .all(hasManagerRights)
  .get(getAccount)
  .put(updateAccount)
  .patch(updateAccount)
  .delete(deleteAccount);

router.route('/:accountId/jogs/')
  .all(hasAdminRights)
  .post(newJog);

router.route('/:accountId/jogs/:jogId')
  .all(hasAdminRights)
  .get(getJog)
  .put(updateJog)
  .patch(updateJog)
  .delete(deleteJog);

export default router;
