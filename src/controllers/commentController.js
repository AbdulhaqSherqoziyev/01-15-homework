const fs = require("fs");
const path = require("path");

const commentsPath = path.join(__dirname, "../databases/commentDatabase.json");

exports.getComments = async (req, res) => {
  try {
    const comments = JSON.parse(fs.readFileSync(commentsPath));
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCommentById = async (req, res) => {
  try {
    const commentId = parseInt(req.params.id);
    const comments = JSON.parse(fs.readFileSync(commentsPath));
    const comment = comments.find((comment) => comment.id === commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addComment = async (req, res) => {
  try {
    const comment = req.body;
    const comments = JSON.parse(fs.readFileSync(commentsPath));

    const lastComment = comments[comments.length - 1];
    const newId = lastComment ? lastComment.id + 1 : 1;
    comment.id = newId;

    comments.push(comment);
    fs.writeFileSync(commentsPath, JSON.stringify(comments, null, 2));
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const commentId = parseInt(req.params.id);
    const updatedComment = req.body;
    const comments = JSON.parse(fs.readFileSync(commentsPath));
    const commentIndex = comments.findIndex(
      (comment) => comment.id === commentId
    );
    if (commentIndex === -1) {
      return res.status(404).json({ message: "Comment not found" });
    }
    comments[commentIndex] = { ...updatedComment, id: commentId };
    fs.writeFileSync(commentsPath, JSON.stringify(comments, null, 2));
    res.status(200).json(comments[commentIndex]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const commentId = parseInt(req.params.id);
    const comments = JSON.parse(fs.readFileSync(commentsPath));
    const filteredComments = comments.filter(
      (comment) => comment.id !== commentId
    );
    if (filteredComments.length === comments.length) {
      return res.status(404).json({ message: "Comment not found" });
    }
    fs.writeFileSync(commentsPath, JSON.stringify(filteredComments, null, 2));
    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
