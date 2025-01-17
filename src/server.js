const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const commentRoutes = require("./routes/commentRoutes");
const postRoutes = require("./routes/postRoutes");
const { photoRouter } = require("./routes/photoRoutes"); 
const path = require("path");

const app = express();
const PORT = 4000;

app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/comments", commentRoutes);
app.use("/posts", postRoutes);
app.use("/photos", photoRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
