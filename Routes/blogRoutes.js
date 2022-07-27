const express = require("express");

const blogController = require("../Controllers/blogController");
const router = express.Router();

router.route("/").get(blogController.getAll).post(blogController.create);

router
  .route("/:id")
  .put(blogController.editBlog)
  .delete(blogController.deleteBlog);

module.exports = router;
