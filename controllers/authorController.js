const prisma = require("../client/prisma");

const {
  storeAuthor,
  showAuthor,
  updateAuthor,
  deleteAuthor,
} = require("../services/authorService.js");

//Getting All author
const getAuthor = async (req, res) => {
  try {
    const authors = await prisma.Author.findMany();
    res.status(200).json({ authors: authors });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const authorStore = async (req, res) => {
  const data = {
    name: req.body.name,
    email: req.body.email,
  };
  try {
    const response = await storeAuthor(data);
    return res.status(201).json({ message: response.message });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const authorShow = async (req, res) => {
  const authorId = req.params.id;
  try {
    const author = await showAuthor(authorId);
    return res.status(200).json({
      author: author,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const authorDestroy = async (req, res) => {
  const authorId = req.params.id;
  try {
    const response = await deleteAuthor(authorId);
    return res.status(200).json({
      message: response.message,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const authorUpdate = async (req, res) => {
  const authorId = req.params.id;
  const data = {
    name: req.body.name,
    email: req.body.email,
  };
  try {
    const response = await updateAuthor(authorId, data);
    return res.status(201).json({ message: response.message });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  authorStore,
  getAuthor,
  authorShow,
  authorUpdate,
  authorDestroy,
};
