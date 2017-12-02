import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const Schema = mongoose.Schema;

function toLower(s) {
  return s.toLowerCase();
}

function remove(s) {
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
  email: { type: String, set: toLower, unique: true },
  username: String,
  password: { type: String, get: remove },
  role: {
    type: String,
    enum: ['REGULAR', 'MANAGER', 'ADMIN'],
    default: 'REGULAR',
  },
  jogs: [jog],
});

Account.plugin(passportLocalMongoose);

export default mongoose.model('Account', Account);