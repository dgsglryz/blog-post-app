const Article = require("../models/article");
const User = require("../models/user");
const mongoose = require("mongoose");

const getArticle = async (req, res) => {
  try {
    const articles = await Article.find();

    const responseArticles = articles.map(async (article) => {
      const user = await mongoose.model("Users").findById(article.author);

      return {
        _id: article._id,
        title: article.title,
        description: article.description,
        author: user ? user.username : "Unknown",
        createdAt: article.createdAt,
        updatedAt: article.updatedAt,
      };
    });

    const finalResponse = await Promise.all(responseArticles);

    res.status(200).json(finalResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const saveArticle = async (req, res) => {
  try {
    const { title, description, author } = req.body;

    const loggedInUser = await User.findById(req.userId);

    if (!loggedInUser || loggedInUser.username !== author) {
      return res.status(403).json({
        error:
          "Unauthorized - You are not allowed to save articles for other users",
      });
    }

    const data = await Article.create({
      title,
      description,
      author: loggedInUser._id,
    });

    const responseData = {
      _id: data._id,
      title: data.title,
      description: data.description,
      author: loggedInUser.username,
    };

    res.status(201).json({ message: "Saved Article ", article: responseData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateArticle = async (req, res) => {
  try {
    const { _id, title, description, username } = req.body;

    const article = await Article.findById(_id);

    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }

    const user = await User.findById(req.userId);

    if (
      !user ||
      article.author.toString() !== req.userId ||
      user.username !== username
    ) {
      return res
        .status(403)
        .json({ error: "Unauthorized - You don't own this article" });
    }

    const updatedArticle = await Article.findByIdAndUpdate(
      _id,
      { title, description },
      { new: true }
    );

    if (!updatedArticle) {
      return res.status(404).json({ error: "Article not found" });
    }

    const responseUpdatedArticle = {
      _id: updatedArticle._id,
      title: updatedArticle.title,
      description: updatedArticle.description,
      author: updatedArticle.author,
    };

    res
      .status(200)
      .json({ message: "Updated Article", article: responseUpdatedArticle });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteArticle = async (req, res) => {
  try {
    const { _id, username } = req.body;

    const article = await Article.findById(_id);

    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }

    const user = await User.findById(req.userId);

    if (
      !user ||
      article.author.toString() !== req.userId ||
      user.username !== username
    ) {
      return res
        .status(403)
        .json({ error: "Unauthorized - You don't own this article" });
    }

    const deletedArticle = await Article.findByIdAndDelete(_id);

    if (!deletedArticle) {
      return res.status(404).json({ error: "Article not found" });
    }

    res.status(200).json({ message: "Deleted Successfully", deletedArticle });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUser = async (req, res) => {
  try {
    const loggedInUser = await User.findById(req.userId);

    if (!loggedInUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const userResponse = {
      name: loggedInUser.name,
      surname: loggedInUser.surname,
      username: loggedInUser.username,
      email: loggedInUser.email,
    };

    res.status(200).json(userResponse);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getArticle,
  saveArticle,
  updateArticle,
  deleteArticle,
  getUser,
};
