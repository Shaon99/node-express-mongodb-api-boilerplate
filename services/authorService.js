const prisma = require("../client/prisma");
// Function to store an author in the database
const storeAuthor = async (data) => {
  try {
    const existingAuthor = await prisma.Author.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingAuthor) {
      throw new Error("Email already exists.");
    }

    // Insert the new author
    await prisma.Author.create({
      data: {
        name: data.name,
        email: data.email,
      },
    });

    return { success: true, message: "Author inserted successfully" };
  } catch (error) {
    throw new Error(error.message);
  }
};

const showAuthor = async (authorId) => {
  const author = await getAuthorById(authorId);
  return author;
};

const updateAuthor = async (authorId, data) => {
  try {
    const author = await getAuthorById(authorId);
    if (!author) {
      throw new Error(`Author with ID ${authorId} not found.`);
    }
    if (author.email !== data.email) {
      const existingAuthor = await prisma.Author.findUnique({
        where: {
          email: data.email,
        },
      });

      if (existingAuthor) {
        throw new Error("Email already exists.");
      }
    }
    await prisma.Author.update({
      where: {
        id: parseInt(authorId),
      },
      data: {
        name: data.name,
        email: data.email,
      },
    });
    return { success: true, message: "Author updated successfully" };
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteAuthor = async (authorId) => {
  const author = await getAuthorById(authorId);
  await prisma.Author.delete({
    where: {
      id: parseInt(authorId),
    },
  });
  return { success: true, message: "Author deleted successfully" };
};

const getAuthorById = async (authorId) => {
  try {
    const author = await prisma.Author.findUnique({
      where: {
        id: parseInt(authorId),
      },
    });

    if (!author) {
      throw new Error("Author not found");
    }
    return author;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  storeAuthor,
  showAuthor,
  updateAuthor,
  deleteAuthor
};
