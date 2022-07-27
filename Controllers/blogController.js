const Blog = require("../Models/blogModel");

exports.create = async (req, res) => {
  try {
    //find a blog with the same title as the one user wants to create
    const found = await Blog.findOne({ title: req.body.title });
    //if a blog is found send an error
    if (found) {
      return res.status(400).json({ message: "Blog title already taken" });
    }
    //save the blog
    //TODO: save the users id with it
    await Blog.create(req.body);
    res.status(200).json({ message: "Blog created" });
  } catch (e) {
    res.status(400).json({ message: "error" });
  }
};

exports.getAll = async (req, res) => {
  try {
    //find all blogs from the database
    const blogs = await Blog.find({});
    //return two values found and blogs
    //found has the amount of blogs found
    //blogs has the data of the blogs
    res.status(200).json({ found: blogs.length, blogs });
  } catch (e) {
    res.status(400).json({ message: "error" });
  }
};

exports.getOne = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.status(200).json({ message: "found", blog });
  } catch (e) {
    res.status(400).json({ message: "error" });
  }
};

exports.editBlog = async (req, res) => {
  try {
    await Blog.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: "Edited Blog" });
  } catch (e) {
    res.status(400).json({ message: "error" });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Edited Blog" });
  } catch (e) {
    res.status(400).json({ message: "error" });
  }
};
