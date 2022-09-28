const sequelize = require("../config/connection");
// const seedComments = require("./commentSeed");
const seedBlogposts = require("./blogpostSeed");

async function seedAll() {
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");

//   await seedComments();
//   console.log('\n----- COMMENTS SEEDED -----\n');

  await seedBlogposts();
  console.log('\n----- BLOGPOSTS SEEDED -----\n');

  process.exit(0);
}

seedAll();
