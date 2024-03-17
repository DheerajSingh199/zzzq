import mongoose, { Aggregate, Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    avatar: {
      type: String, //clodinary URL
      required: true,
    },

    coverImage: {
      type: String, //clodinary URL
    },
    watchHistory: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
    password: {
      type: String,
      required: [true, "Password is Requrired"],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timeseries: true,
  }
);
//this will check if password upadte or not  if update then complete 10 bash and ecrpyt password

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hash(this.password, 10);
  next();
});

//first we Make own method or kind of fuction "isPasswordCorrect"
//after that we will check if password correct that you put to database password
//
userSchema.methods.IsPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.gererateAcessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
userSchema.methods.gererateRefreshToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_SECRET,
    }
  );
};

export const User = mongoose.model("User", userSchema);
