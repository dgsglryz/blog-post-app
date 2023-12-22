const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { SECRET_KEY } = require("../config/config");

const registerUser = async (req, res) => {
  try {
    const { name, surname, email, username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 15);

    const newUser = new User({
      name,
      surname,
      email,
      username,
      password: hashedPassword,
    });

    await newUser.save();

    const secureUserInfo = {
      userId: newUser._id,
      username: newUser.username,
      email: newUser.email,
    };

    res
      .status(201)
      .json({ message: "User registered successfully.", user: secureUserInfo });
  } catch (error) {
    console.log("Error! Registering user: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "Invalid User" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log("Invalid password");
      return res.status(401).json({ error: "Invalid Password" });
    }

    const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
      expiresIn: "15m",
    });

    jwt.verify(token, SECRET_KEY, (err) => {
      if (err) {
        console.error("Token verification failed:", err.message);
        return res.status(401).json({ error: "Unauthorized - Invalid token" });
      }
      console.log("token", token);

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 900000,
      });

      res.status(200).json({
        message: "Login successful.",
        userId: user._id,
        email: user.email,
        username: user.username,
        token,
      });
    });
  } catch (error) {
    console.error("Error! Logging in user: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const logoutUser = async (req, res) => {
  try {
    const userToken = req.cookies.token;
    if (!userToken) {
      return res.status(401).json({ error: "User not logged in." });
    }

    res.clearCookie("token");

    res.json({ message: "Logout successful." });
  } catch (error) {
    console.log("Error! Logging out user: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  SECRET_KEY,
};
