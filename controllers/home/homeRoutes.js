const router = require("express").Router();
const { BlogPost, User } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
  try {
    res.render("login", { loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/signUp", async (req, res) => {
  if (req.session.loggedIn) res.redirect("/dashboard");
  else res.render("signUp");
});

router.get("/blogPost", withAuth, async (req, res) => {
  try {
    const userData = await User.findOne({ where: { id: req.session.userId } });
    const user = userData.get({ plain: true });

    const blogPostData = await BlogPost.findAll({ where: { userId: user.id } });
    const blogPosts = blogPostData.map((data) => data.get({ plain: true }));

    res.render("blogPost", {
      blogPosts,
      userName: user.name,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;