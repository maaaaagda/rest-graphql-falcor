import moment from "moment";
import mongoose from "mongoose";
import uuidv1 from "uuid/v1";

import { UserRole } from "./UserRole";

export const userSchema: mongoose.Schema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      default: uuidv1(),
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: [UserRole.ADMIN, UserRole.USER],
      default: UserRole.USER,
    },
    verification: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    urlTwitter: {
      type: String,
    },
    urlGitHub: {
      type: String,
    },
    loginAttempts: {
      type: Number,
      default: 0,
      select: false,
    },
    blockExpires: {
      type: String,
      default: moment().utc().toISOString(),
      select: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  });
