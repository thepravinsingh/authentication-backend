const User = require("../models/user-schema");
const bcrypt = require("bcrypt");

const home = async (req, res) => {
  try {
    res.status(201).json({ message: "I am from the home page" });
  } catch (error) {
    res.status(500).json({ message: "Internal Error" });
  }
};

const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(400).json({ message: "Email is already Present" });
    }

    const userDetail = await User.create({
      username: username,
      email: email,
      phone: phone,
      password: password,
    });

    res.status(201).json({
      message: "Registration Success",
      token: await userDetail.generateToken(),
      userId: userDetail._id,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Error" });
    console.error(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email: email });
    if (!userExist) {
      return res.status(400).json({ message: "User is not register" });
    }

    const user = await userExist.comparePassword(password);

    if (user) {
      res.status(201).json({
        message: "Login Success",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid email and password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Error" });
  }
};

module.exports = { home, login, register };
