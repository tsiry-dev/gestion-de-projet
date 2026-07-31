import { hashPassword } from "@/shared/utils/bcript";
import { HydratedDocument, model, Schema } from "mongoose";
import bcrypt from 'bcrypt';

export interface User {
  email: string;
  name: string;
  password: string;
}

export type UserDocument = HydratedDocument<User>;

const userSchema = new Schema<User>({
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  name: { type: String, required: true, trim: true },
  password: { type: String, required: true },
}, { timestamps: true });

userSchema.pre("save", async function(_next) {
    if(this.isModified("password")) {
        this.password = await hashPassword(this.password);
    }
});

userSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const UserModel = model<User>("User", userSchema, "users");
export default UserModel;