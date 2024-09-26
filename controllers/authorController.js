const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { storeAuthor } = require("../services/authorService.js");

//Getting All author
const getAuthor = async (req, res) => {
  try {
    const authors = await prisma.AuthorModel.findMany();
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

module.exports = {
  authorStore,
  getAuthor,
};
