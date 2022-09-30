const router = require("express").Router();
const { User, BlogPost} = require("../../models");
const notFound = `No user was found with this id.`;
const wrongInformation = `Incorrect email or password, please try again.`;

router.get("/", async (req, res) => {
  try {
    const data = await User.findAll({ include: [{ model: BlogPost }] });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [{ model: BlogPost}],
    });

    if (user === null) {
      res.status(404).json({ message: notFound});
      return;
    } else res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    req.session.save(() => {
      req.session.userId = user.id;
      req.session.loggedIn = true;

      res.status(200).json(user);
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData) {
      res.status(400).json({ message: wrongInformation });
      return;
    }

    const validPassword = await userData.CheckPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: wrongInformation });
      return;
    }

    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.loggedIn = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.put("/:id", async (req, res) => {
  try {
    const user = await User.update(req.body, { where: { id: req.params.id } });
    if (!user) {
      res.status(404).json({ message: notFound });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await User.destroy({ where: { id: req.params.id } });
    if (user === null) {
      res.status(404).json({ message: notFound});
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
