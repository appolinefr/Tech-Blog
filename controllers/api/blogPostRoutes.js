const router = require("express").Router();
const { BlogPost } = require("../../models");
const withAuth = require("../../utils/auth");
const notFound = `No blogpost was found with this id.`;

router.get("/", async (req, res) => {
  try {
    const blogPostData = await BlogPost.findAll();
    res.status(200).json(blogPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", withAuth, async (req, res) => {
  try {
    const newBlogPost = await BlogPost.create(req.body);
    req.session.save(() => {
      req.session.userId = newBlogPost.id;
      req.session.loggedIn = true;

      res.status(200).json(newBlogPost);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", withAuth, async (req, res) => {
  try {
    const blogPost = await BlogPost.update({ where: { id: req.params.id } });
    if (!blogPost) {
      res.status(404).json({ message: notFound});
      return;
    }
    res.status(200).json(blogPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const blogPostData = await BlogPost.destroy({
      where: { id: req.params.id },
    });

    if (!blogPostData) {
      res.status(404).json({ message: notFound });
      return;
    }

    res.status(200).json(blogPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
