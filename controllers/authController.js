const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const User = require("../models/user");

//Creating user signup
const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  const bcryptPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name: name,
    email: email,
    password: bcryptPassword,
  });

  try {
    await user.save(() => {
      res.status(201).json({ message: "user registered successfully" });
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//user sign in
const signIn = async (req, res) => {
  const { email, password } = req.body;  
  try {
    const user = await User.find({ email: email });
    if (user && user.length > 0) {
      const checkValidPassword = await bcrypt.compare(
        password.toString(),
        user[0].password
      );
      if (checkValidPassword) {
        //generate jwt token
        const token = jwt.sign(
          {
            name: user[0].name,
            useId: user[0]._id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "2h",
          }
        );

        res.status(200).json({
          token: token,
          message: "login successful!!!",
        });
      } else {
        res.status(401).json({ message: "Authentication Failed!!" });
      }
    } else {
      res.status(401).json({ message: "Authentication Failed!!" });
    }
  } catch {
    res.status(401).json({ message: "Authentication Failed!!" });
  }
};

module.exports = {
  signUp,
  signIn,
};
