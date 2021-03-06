"use strict";

const Mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const user_schema = new Mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: (value) => {
        if (!validator.isEmail(value)) {
          throw new Error({ error: "Invalid Email address" });
        }
      },
    },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const User = Mongoose.model("User", user_schema);

module.exports = User;
