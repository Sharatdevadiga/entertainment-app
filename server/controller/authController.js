/* eslint-disable no-undef */
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import jsonwebtoken from "jsonwebtoken";
import { errorHandler } from "../utils/handlers.js";

const saltRounds = 12;

function signToken(id) {
  const payload = { userId: id };
  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: process.env.JWT_EXPIRES_IN,
  };
  const token = jsonwebtoken.sign(payload, secret, options);
  return token;
}

async function createSendTokenWithCookie(
  user,
  statusCode = 200,
  req,
  res,
  successmessage = "Success"
) {
  try {
    const token = signToken(user._id);
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    };

    res.cookie("jwt", token, cookieOptions);

    res.status(statusCode).json({
      status: "success",
      message: successmessage,
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "fail", message: "Token creation failed" });
  }
}

export async function userSignup(req, res) {
  try {
    // IF EMAIL ALREADY TAKEN THEN SHOW ERROR
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        status: "fail",
        message: "User already exists, try different Email",
      });
    } else {
      // ENCRYPT THE PASSWORD AND STORE IN DATABASE
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newUser = new User({ email, password: hashedPassword });
      await newUser.save();

      // SIGN AND SEND THE TOKEN IN COOKIE
      const successmessage = "Successfully signed up";
      await createSendTokenWithCookie(newUser, 201, req, res, successmessage);
      // next();
    }
  } catch (err) {
    errorHandler(res, 500, "Sign up Failed", err);
  }
}

export async function userLogin(req, res) {
  try {
    const { email, password } = req.body;

    //1. IF EMAIL AND PASSWORD ARE NOT THER SEND ERROR
    if (!email || !password)
      return errorHandler(res, 404, "Please provide proper email and password");

    // 2. FIND USER AND VERIFY PASSWORD
    const user = await User.findOne({ email }).select("+password");
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!user || !isPasswordCorrect)
      return errorHandler(res, 404, "Incorrect email/password.");

    // 3. IF EVERYTHING IS OK, SING AND SEND THE TOKEN
    createSendTokenWithCookie(user, 200, req, res, "Successfully logged In");
    // next();
  } catch (err) {
    errorHandler(res, 500, "Login faled, please try again", err);
  }
}

export async function userLogout(req, res) {
  // replace the existing cookie with an empty cookie
  res.cookie("jwt", "Logged-Out", {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  });

  // then send the response status code and a message
  res.status(200).json({
    status: "success",
    message: "successfully logged out",
  });
  // next();
}
