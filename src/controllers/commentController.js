const fs = require("fs");
const path = require("path");
const databasePath = path.join(__dirname, "../databases/userDatabase.json");

function readDatabase() {
  if (!fs.existsSync(databasePath)) fs.writeFileSync(databasePath, "[]");
  return JSON.parse(fs.readFileSync(databasePath));
}

function writeDatabase(data) {
  fs.writeFileSync(databasePath, JSON.stringify(data, null, 2));
}

exports.register = (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const users = readDatabase();
  const newUser = { id: users.length + 1, username, email, password };
  users.push(newUser);
  writeDatabase(users);
  res
    .status(201)
    .json({ id: newUser.id, username: newUser.username, email: newUser.email });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email end password are required" });
  }
  const users = readDatabase();
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  res
    .status(200)
    .json({ id: user.id, username: user.username, email: user.email });
};