import { User } from "../models/users.js";
import bcrypt from "bcrypt";
import { sendCookies } from "../utils/features.js";

// register user controller

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });

  if (user) {
    return res.status(404).json({
      success: false,
      message: "User Already Exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  user = await User.create({ name, email, password: hashedPassword });

  sendCookies(user, res, "Register Sucessfully", 201);
};

// login user controller

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Invelid Email Or Password",
    });
  }
  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) {
    return res.status(404).json({
      success: false,
      message: "Invelid Email Or Password",
    });
  }

  sendCookies(user, res, `welcome ${user.name}`, 200);
};

// display all user controller

export const getAllUsers = async (req, res) => {};

// get specific user details

export const getAllUserDetails = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logout = async (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === " development" ? "lax" : "none",
      secure: process.env.NODE_ENV === " development" ? false : true,
    })
    .json({
      success: true,
      user: req.user,
    });
};
