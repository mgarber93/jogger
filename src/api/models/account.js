import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

// eslint-disable-next-line
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function toLower(s) {
  return s.toLowerCase();
}

function remove(a) {
  return undefined;
}

const jog = new Schema({
  date: { type: Date, default: Date.now },
  distance: { type: Number, min: 0, required: true },
  distanceFormat: { type: String, enum: ['km', 'mi'], required: true },
  time: { type: Number, min: 0, required: true },
  timeFormat: { type: String, enum: ['min', 's'], required: true },
});

export const Jog = mongoose.model('Jog', jog);

const Account = new Schema({
  email: { 
    type: String, 
    set: toLower, 
    unique: true,
    match: [emailRegex, 'Please enter a valid email address'],
    trim: true
  },
  username: {
    type: String,
    unique: true,
    trim: true
  },
  password: { type: String, get: remove },
  role: {
    type: String,
    enum: ['REGULAR', 'MANAGER', 'ADMIN'],
    default: 'REGULAR',
  },
  jogs: [jog],
});


Account.pre('save', function(next) {
  const user = this;
  const {password} = user._doc;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    // hash the password using our new salt
    bcrypt.hash(password, salt, function(err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

Account.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this._doc.password);
};

export default mongoose.model('Account', Account);