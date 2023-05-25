import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcrypt";

enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

interface User extends Document {
  username: string;
  password: string;
  role: UserRole;
}

export interface SerializedUser {
  id: string;
  username: string;
}

interface UserDocument extends User {
  checkPassword: (password: string) => Promise<boolean>;
  serialize: () => User;
}

const userSchema = new mongoose.Schema<User>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: UserRole, default: UserRole.USER },
});

userSchema.pre<UserDocument>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

userSchema.methods.checkPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.serialize = function () {
  return {
    id: this._id,
    username: this.name,
  };
};

const UserModel: Model<UserDocument> = mongoose.models.User || mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
