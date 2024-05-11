const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// hashing password
userSchema.pre("save", async function (next) {
  const user = this;
  try {
    if (!user.isModified("password")) {
      next();
    }
    const saltRound = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(this.password, saltRound);
    this.password = hashPassword;
  } catch (error) {
    next(error);
  }
});

// converting into jwt token
userSchema.methods.generateToken = async function () {
  return await jwt.sign(
    {
      email: this.email,
      userId: this._id.toString(),
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "30d",
    }
  );
};

// comparing password
userSchema.methods.comparePassword = async function (password) {
  try {
    return bcrypt.compare(password, this.password);
  } catch (error) {
    console.log(error);
  }
};

const User = new mongoose.model("User", userSchema);
module.exports = User;
