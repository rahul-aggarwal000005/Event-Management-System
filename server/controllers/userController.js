const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.SECRET;

const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id, role } = req.body;
    if (!role || !id) {
      throw new Error("Role or Id not provided");
    }
    const user = await User.findById(id);
    if (!user) {
      throw new Error("No such user exist with the provided Id");
    }
    user.role = role;
    const updatedUser = await user.save();
    res.json({ message: "User update successfully", updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      throw new Error("id is not provided");
    }
    const deletedUser = await User.deleteOne({ _id: id });
    res.json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new Error("Invalid credentials");
    }
    const maxAge = 5 * 60;
    const token = jwt.sign(
      { id: user._id, username, role: user.role }, // this data should not contain sensitive info of user
      jwtSecret,
      {
        expiresIn: maxAge, // 3min in sec
      }
    );
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000, // 3min in ms
    });
    res.json({ message: "Logged in successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const register = async (req, res) => {
  const { username, password, email } = req.body;
  if (password.length < 6) {
    return res.status(500).json({ message: "Password less than 6 characters" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const maxAge = 5 * 60;
    const token = jwt.sign(
      { id: user._id, username, role: user.role }, // this data should not contain sensitive info of user
      jwtSecret,
      {
        expiresIn: maxAge, // 3min in sec
      }
    );
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000, // 3min in ms
    });
    return res.status(200).json({ mesage: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: "1" });
  res.json({ message: "user logged out successfully" });
};

module.exports = {
  login,
  register,
  getAllUser,
  updateUser,
  deleteUser,
  logout,
};
