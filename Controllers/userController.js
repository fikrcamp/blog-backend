const User = require("../Models/userModel");
const bcrypt = require("bcrypt");

//Signup - Create a new user
exports.signup = async (req, res) => {
  try {
    //Find from database if there is already a user with the email
    //user wants to create an account with
    const found = await User.findOne({ email: req.body.email });
    //If email already exsists return an error
    if (found) {
      return res.status(400).json({ message: "Email already taken" });
    }
    //check if password and confirm passowrd is the same
    //if not send an error
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).json({ message: "Password do not match" });
    }
    //encrypt password and set req.body.password to the encrypted password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    //Save the new user to the database and send success response
    await User.create(req.body);
    res.status(200).json({ message: "Successfully created user" });
  } catch (e) {
    res.status(400).json({ message: "Error" });
  }
};

//Login
exports.login = async (req, res) => {
  try {
    //find if this user exsists in the database
    const found = await User.findOne({ email: req.body.email });
    //if user doesnt exsist send an error
    if (!found) {
      return res
        .status(400)
        .json({ message: "Email or password is incorrect" });
    }
    //compare the passowrd in the database to the password user passed
    const compare = await bcrypt.compare(req.body.password, found.password);
    //if passwords dont match send an error
    if (compare === false) {
      return res
        .status(400)
        .json({ message: "Email or password is incorrect" });
    }
    //send a success message
    res.status(200).json({ message: "Welcome" });
  } catch (e) {
    res.status(400).json({ message: "Error" });
  }
};
