// src/models/user.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId; // ✅ explicitly typed
  name: string;
  email: string;
  password: string;
  favorites: string[];
  likedRecipes: string[];
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    favorites: { type: [String], default: [] },
    likedRecipes: { type: [String], default: [] }
  },
  { timestamps: true } // optional: adds createdAt & updatedAt
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
