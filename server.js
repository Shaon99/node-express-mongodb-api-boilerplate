require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");

const app = express();
//ACCEPT ONLY JSON
app.use(express.json());
app.use(cors());
//All Routes
app.use('/api/v1', routes);


//ALL OBJECT TRUE
app.use(express.urlencoded({ extended: true }));

//DATABASE CONNECTION
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connection successfully"))
  .catch((err) => console.log(err));

//ERROR HANDLER
const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
};

app.use(errorHandler);

//LISTEN
app.listen(process.env.PORT, () =>
  console.log(`Rest Api app listening on port ${process.env.PORT}!`)
);
