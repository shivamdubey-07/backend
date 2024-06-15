import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true, // helps in searching
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    avatar: {
      type: String, //cloudinary service we will use
      require: true,
    },
    coverImage: {
      type: String,
    },
    watchHistory: [
      //array of objects
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      require: [true, "Passwrod is required"],
    },
    refreshtoke: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); //if password is not modified
  this.password = bcypt.hash(this.password, 10);
  next();
}); //it is hook which execute just before data is save in database
//don't use arrow callback function
//we are encrypting the password just before the save

//Here i have made a custom method
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcypt.compare(password, this.password);
};

//for generating accesstoken

userSchema.methods.generateAccessToken = function () {
 
 //in jwt({payload},secret,{expiry})
    jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
//for generating refreshtoken

userSchema.methods.generateRefreshToken = function () {
    jwt.sign(
        {
          _id: this._id,
          
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
      );
};

export const User = mongoose.model("User", userSchema);
