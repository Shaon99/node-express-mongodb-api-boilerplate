const { Pool } = require("pg");
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

// Function to connect to PostgreSQL
const connectPostgresDB = async () => {
  try {
    // Optional, you can remove this if pool connects automatically
    await pool.connect();
    console.log("Connected to PostgreSQL database.");
  } catch (error) {
    console.error("Error connecting to PostgreSQL:", error);
    throw error;
  }
};

// Graceful shutdown function
const closePostgresConnection = async () => {
  try {
    await pool.end();
    console.log("PostgreSQL connections closed.");
  } catch (error) {
    console.error("Error closing PostgreSQL connections:", error);
  }
};

// Optionally, you can close the Prisma client when you're done
const closePrismaClient = async () => {
  await prisma.$disconnect();
};

module.exports = {
  closePrismaClient,
  connectPostgresDB,
  closePostgresConnection,
};
