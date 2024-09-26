require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const connectMongoDB = require("./connectMongoDB");
const {
  connectPostgresDB,
  closePostgresConnection,
  closePrismaClient
} = require("./connectPostgresDB");

const app = express();

//ACCEPT ONLY JSON
app.use(express.json());
//CORS ALL DEFAULT
app.use(cors());
//ALL OBJECT TRUE
app.use(express.urlencoded({ extended: true }));

//All Routes
app.use("/api/v1", routes);

//GLOBAL ERROR HANDLER
const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
};
app.use(errorHandler);

//server
const startServer = async () => {
  try {
    await connectMongoDB();
    await connectPostgresDB();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () =>
      console.log(`Rest API app listening on port ${PORT}!`)
    );
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

// Graceful shutdown for closing PostgreSQL pool, MongoDB, etc.
process.on("SIGINT", async () => {
  try {
    console.log("Shutting down gracefully...");
    //pool for PostgreSQL, close it here
    await closePostgresConnection();
    await closePrismaClient();
    process.exit(0);
  } catch (error) {
    console.error("Error during shutdown:", error);
    process.exit(1);
  }
});

// start server
startServer();
