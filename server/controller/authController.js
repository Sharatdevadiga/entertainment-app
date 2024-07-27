/* eslint-disable no-undef */
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import jsonwebtoken from "jsonwebtoken";

const saltRounds = 10;

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
        Date.now() + process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: true,
    };

    res.cookie("jwt", token, cookieOptions);

    res.status(statusCode).json({
      status: "success",
      message: successmessage,
      token,
    });
  } catch (err) {
    res.status(500).json({ status: "fail", message: "Token creation failed" });
    console.error(err);
  }
}

export async function userSignup(req, res, next) {
  try {
    // IF EMAIL ALREADY TAKEN THEN SHOW ERROR
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
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
    }
  } catch (err) {
    res.status(500).json({ status: "fail", message: "Sign up Failed" });
    console.error(err);
  }
  next();
}

export async function userLogin(req, res) {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    //1. IF EMAIL AND PASSWORD ARE NOT THER SEND ERROR
    if (!email || !password) {
      return res.status(404).json({
        status: "fail",
        message: "Please provide proper email and password",
      });
    }

    // 2. FIND USER AND VERIFY PASSWORD
    const user = await User.findOne({ email }).select("+password");
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({
        status: "fail",
        message:
          "Incorrect email or password. If you donot hav a account, please create one",
      });
    }

    // 3. IF EVERYTHING IS OK, SING AND SEND THE TOKEN
    const successmessage = "Successfully logged In";
    createSendTokenWithCookie(user, 200, req, res, successmessage);
  } catch (err) {
    console.error(err);
    res.status(400).json({
      status: "fail",
      message: "Login faled, please try again",
    });
  }
}
