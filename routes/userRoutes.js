const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { readUsers, saveUsers } = require("./../utils/userUtils");
const jwt = require("jsonwebtoken");
const authenticateToken = require("./../auth/auth");
const User = require("./../entities/user");
const {
  createUserSchema,
  updateUserSchema,
} = require("./../validationSchemas/userSchema");

require("dotenv").config();

router.post("/users", async (req, res) => {
  const { error } = createUserSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { username, name, password } = req.body;

  const users = readUsers();
  try {
    const encryptedPassword = await bcrypt.hash(password, 10);

    const usertoSave = new User(username, name, encryptedPassword);

    users.push(usertoSave);
    saveUsers(users);
    const { password, ...userWithoutPassword } = usertoSave;

    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error("Error encrypting password;", error.stack);
    res.status(500).json({ message: "Error encrypting password" });
  }
});

router.get("/users", authenticateToken, (req, res) => {
  const users = readUsers();
  users.forEach((user) => delete user.password);
  res.status(200).json(users);
});

router.get("/users/:username", authenticateToken, (req, res) => {
  const users = readUsers();

  const userExists = users.find(
    (user) => user.username === req.params.username
  );

  if (!userExists) res.status(404).json({ message: "User not found" });

  const { password, ...userWithoutPassword } = userExists;

  res.status(200).json(userWithoutPassword);
});

router.put("/users/:username", authenticateToken, async (req, res) => {
  const { error } = createUserSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { username, name, password } = req.body;
  const users = readUsers();

  const userIndex = users.findIndex(
    (user) => user.username === req.params.username
  );
  if (userIndex === -1) res.status("404").json({ message: "User not found" });
  try {
    const encryptedPassword = await bcrypt.hash(user.password, 10);
    const userToUpdate = new User(username, name, encryptedPassword);

    users["userIndex"] = userToUpdate;
    saveUsers(users);

    const { password, ...userWithoutPassword } = userToUpdate;
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error("Error encrypting password;", error.stack);
    res.status(500).json({ message: "Error encrypting password" });
  }
});

router.delete("/users/:username", authenticateToken, (req, res) => {
  const users = readUsers();
  const userIndex = users.findIndex(
    (user) => user.username === req.params.username
  );

  if (userIndex === -1) res.status(404).json({ message: "User not found" });

  users.splice(userIndex, 1);
  saveUsers(users);
  res.status(204).json();
});

router.post("/login", async (req, res) => {
  const user = req.body;
  if (!user.username && !user.password)
    res.status(404).json({ message: "Username and password are required" });

  const users = readUsers();
  const userExists = users.find((user) => user.username === req.body.username);
  if (!userExists) res.status(404).json({ message: "message: User not found" });

  try {
    const passwordMatch = await bcrypt.compareSync(
      user.password,
      userExists.password
    );

    if (!passwordMatch) res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ username: user.username }, process.env.SECRETKEY);
    res.status(200).json({ token: token });
  } catch (error) {
    console.error("Error comparing passwords:", error.stack);
  }
});

module.exports = router;
