const router = require("express").Router();
const { BlogPost, User, Comment } = require("../../models");
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
    const comments = await Comment.findAll({
      where: { blogPost_id: req.params.id },
      include: [{ model: User, attributes: ["name"] }],
    });
    const comment = comments.map((data) => data.get({ plain: true }));

    res.render("homepage", {
      blogPosts,
      comment,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const users = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: BlogPost }],
    });
    const user = users.get({ plain: true });

    const blogPostData = await BlogPost.findAll({ where: { user_id: user.id } });
    const blogPosts = blogPostData.map((data) => data.get({ plain: true }));
    
    res.render("dashboard", {
      user,
      blogPosts,
      userName: user.name,
      loggedIn: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
