const fs = require("fs");
const path = require("path");

const postsPath = path.join(__dirname, "../databases/postDatabase.json");

exports.getPosts = async (req, res) => {
  try {
    const posts = JSON.parse(fs.readFileSync(postsPath));
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    const posts = JSON.parse(fs.readFileSync(postsPath));
    const post = posts.find((post) => post.id === postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addPost = async (req, res) => {
  try {
    const post = req.body;
    const posts = JSON.parse(fs.readFileSync(postsPath));

    const lastPost = posts[posts.length - 1];
    const newId = lastPost ? lastPost.id + 1 : 1;
    post.id = newId;

    posts.push(post);
    fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    const updatedPost = req.body;
    const posts = JSON.parse(fs.readFileSync(postsPath));
    const postIndex = posts.findIndex((post) => post.id === postId);
    if (postIndex === -1) {
      return res.status(404).json({ message: "Post not found" });
    }
    posts[postIndex] = { ...updatedPost, id: postId };
    fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
    res.status(200).json(posts[postIndex]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    const posts = JSON.parse(fs.readFileSync(postsPath));
    const filteredPosts = posts.filter((post) => post.id !== postId);
    if (filteredPosts.length === posts.length) {
      return res.status(404).json({ message: "Post not found" });
    }
    fs.writeFileSync(postsPath, JSON.stringify(filteredPosts, null, 2));
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
