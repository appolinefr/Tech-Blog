const router = require("express").Router();
const { BlogPost, User } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/login", async (req, res) => {
  try {
    res.render("login", { loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/signUp", async (req, res) => {
  if (req.session.loggedIn) res.redirect("/homepage");
  else res.render("signUp");
});

router.get("/", async (req, res) => {
  try {
    const blogPostData = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const blogPosts = blogPostData.map((blogPost) =>
      blogPost.get({ plain: true })
    );

    res.render("homepage", {
      blogPosts,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const userData = await User.findOne({ where: { id: req.session.userId } });
    const user = userData.get({ plain: true });

    const blogPostData = await BlogPost.findAll({ where: { userId: user.id } });
    const blogPosts = blogPostData.map((data) => data.get({ plain: true }));

    res.render("dashboard", {
      blogPosts,
      userName: user.name,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
