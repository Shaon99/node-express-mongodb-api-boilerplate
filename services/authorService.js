const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Function to store an author in the database
const storeAuthor = async (data) => {
  try {
    const existingAuthor = await prisma.AuthorModel.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingAuthor) {
      throw new Error("Email already exists.");
    }

    // Insert the new author
    await prisma.AuthorModel.create({
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

module.exports = {
  storeAuthor,
};
