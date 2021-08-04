const express = require("express");
const User = require("../models/User.model");
const usersController = require("../controllers/users.controller");
const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find();
  return res.status(200).json(users);
});

router.post("/profile", async (req, res, next) => {
  try {
    const { email, username, password, emoji } = req.body;

    const newUser = new User({ email, username, password, emoji });

    const createdUser = await newUser.save();

    return res.redirect(`/profile/${createdUser._id}`);
  } catch (error) {
    return next(error);
  }
});

router.post("/register", usersController.registerPost);
router.post("/login", usersController.loginPost);
router.post("/logout", usersController.logoutPost);
router.get("/check-session", usersController.checkSession);

module.exports = router;
