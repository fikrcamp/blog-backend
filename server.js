const mongoose = require("mongoose");

//DB has the full connection string
const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DB_PASSWORD);

mongoose
  .connect(DB)
  .then(() => console.log("Connected to DB ✅")) //if databse connection is ✅
  .catch(() => console.log("Connection Error! ❌")); //if databse connection is ❌
