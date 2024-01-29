import { compareSync } from 'bcrypt';
import mongoose from 'mongoose';
import { User, UserMethods } from '../types';

const UserSchema = new mongoose.Schema<User, mongoose.Model<User, unknown, UserMethods>>({
  email: { type: String, unique: true },
  username: String,
  password: String,
},
{timestamps: true});

UserSchema.methods.comparePassword = function (password: string) {
  return compareSync(password, this.password);
};

export default mongoose.model<User, mongoose.Model<User, unknown, UserMethods>>('User', UserSchema);
