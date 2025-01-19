const fs = require("fs");
const path = require("path");
const databasePath = path.join(__dirname, "../databases/userDatabase.json");

function readDatabase(databasePath) {
  if (!fs.existsSync(databasePath)) fs.writeFileSync(databasePath, "[]");
  return JSON.parse(fs.readFileSync(databasePath));
}

function writeDatabase(databasePath, data) {
  fs.writeFileSync(databasePath, JSON.stringify(data, null, 2));
}

exports.getAllUsers = (req, res) => {
  const users = readDatabase(databasePath);
  res.status(200).json(users);
};
exports.getUserbyId = (req, res) => {
  const { userId } = req.params;
  const users = readDatabase(databasePath);
  const user = users.find((user) => user.id === parseInt(userId));
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
};

exports.updateUser = (req, res) => {
  const { userId } = req.params;
  const { username, email } = req.body;
  const users = readDatabase(databasePath);
  const userIndex = users.findIndex((u) => u.id === parseInt(userId));
  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }
  users[userIndex] = { ...users[userIndex], username, email };
  writeDatabase(databasePath, users);
  res.status(200).json(users[userIndex]);
};

exports.deleteUser = (req, res) => {
  const { userId } = req.params;
  const users = readDatabase(databasePath);
  const userIndex = users.findIndex((u) => u.id === parseInt(userId));
  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }
  users.splice(userIndex, 1);
  writeDatabase(databasePath, users);
  res.status(204).send();
};