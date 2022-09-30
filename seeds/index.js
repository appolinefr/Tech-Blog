const sequelize = require("../config/connection");
const { User, BlogPost, Comment } = require("../models");
const seedBlogposts = require("./blogpostSeed");
const seedComments = require("./commentSeed");
const seedUsers = require("./userSeed");

async function seedAll() {
  await sequelize.sync({ force: true });
  await User.bulkCreate(seedUsers);
  await BlogPost.bulkCreate(seedBlogposts);
  await Comment.bulkCreate(seedComments);
}

seedAll();
