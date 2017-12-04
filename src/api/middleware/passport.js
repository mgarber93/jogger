import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import Account from '../models/account';


passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(async function(id, done) {
  try {
    const account = await Account.findById(id);
    if (account) {
      const user = account.toObject();
      user.password = undefined;
      delete user.password;
      done(null, user)
    } else {
      done(null, null);
    }
  } catch (e) {
    done(null, null, { message: 'No User Found!' })
  }
})

passport.use('local-login', new LocalStrategy({
    usernameField: 'username', 
    passwordField: 'password',
    passReqToCallback: true,
  }, async function(req, username, password, done) {
    try {
      const account = await Account.findOne({username});
      // check password
      if (await account.comparePassword(password)) {
        done(null, account.toObject());
      }
      done(null, null, { message: 'invalid credentials'});
    } catch (e) {
      done(null, null, { message: 'internal error'});
    }
  }))

export default passport;