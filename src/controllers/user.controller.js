const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require(jsonwebtoken);
const {
  transporter,
  recoverypassword,
  resetpassword,
} = require("../utils/mailer");

module.exports = {
  //GET-READ
  async list(req, res) {
    try {
      const users = await User.find();
      res.status(200).json({ message: "Users found", data: users });
    } catch (err) {
      res.status(404).json({ message: "User not found" });
    }
  },

  //show ID
  async show(req, res) {
    try {
      const id = req.user;
      const user = await User.findById(id).select("-password");
      res.status(200).json(user);
    } catch (err) {
      res.status(404).json(err);
    }
  },

  //UPDATE
  async update(req, res) {
    try {
      const userId = req.user;
      const user = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
        runValidators: true,
        context: "query",
      }).select("-password");
      res.status(200).json({ message: "User updated" });
    } catch (err) {
      res.status(400).json({ message: "User could not be updated", data: err });
    }
  },

  //DELETE
  async destroy(req, res) {
    try {
      const userId = req.user;
      const user = await User.findByIdAndDelete(userId);
      res.status(200).json({ message: "User deleted", data: user });
    } catch (err) {
      res.status(400).json({ message: "User could not be deleted", data: err });
    }
  },

  //CREATE
  async create(req, res) {
    try {
      const data = req.body;
      const encPassword = await bcrypt.hash(data.password, 8);
      const newUser = { ...data, password: encPassword };
      const user = await User.create(newUser);

      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: 60 * 60 * 24,
      });
      res.status(201).json({
        message: "user created",
        data: { token },
      });
    } catch (err) {
      res.status(400).json({ message: "user could not be created", data: err });
    }
  },

  //SIGNIN
  async signin(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("user or password invalid");
      }
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new Error("user or password invalid");
      }
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: 60 * 60 * 24,
      });
      res.status(201).json({ message: "user login successfully", data: token });
    } catch (err) {
      res.status(400).json({ message: "user cannot login" });
    }
  },

  // RECOVERY
  async recoveryPass(req, res) {
    try {
      const { email } = req.body;
      const user = await User.findOne(email);
      if (!user) {
        throw new Error("Email not found");
      }
      await transporter.sendMail(recoverypassword(user.email, user.name));
      res.status(201).json({ message: "email sent" });
    } catch (err) {
      res.status(400).json({ message: "email was not sent" });
    }
  },

  //CHANGE
  async changePass(req, res) {
    try {
      const userId = req.user;
      let message = "Invalid old password";
      const { password, newpassword } = req.body;
      let authorization = false;
      const user = await User.findById(userId);
      if (!user) {
        throw new Error({ message: "User not found" });
      }
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        const encPassword = await bcrypt.hash(newpassword, 8);
        const user = await User.findByIdAndUpdate(
          userId,
          { password: encPassword },
          { new: true, runValidators: true, context: "query" }
        );
        authorization = true;
        message = "password update successfully";
      }
      res.status(201).json({
        message: message,
        data: authorization,
      });
    } catch (err) {
      res.status(400).json({ message: "password was not updated", data: err });
    }
  },
};
