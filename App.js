const express = require("express");
const dotenv = require("dotenv");
const app = express();

//Import the routes
const userRoutes = require("./Routes/userRoutes");
const blogRoutes = require("./Routes/blogRoutes");

dotenv.config({ path: "./.env" }); // The path for the enviroment varaibles
require("./server"); // import server file

app.use(express.json()); //convert JSON to an Object

//Routes
app.use("/user", userRoutes);
app.use("/blog", blogRoutes);

const port = process.env.PORT || 8000; //get port from enviroment variable if not port = 8000

app.listen(port, () => {
  //Listening on port
  console.log(`listening on port ${port}`);
});
