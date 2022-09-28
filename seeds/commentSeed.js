const { Comment } = require("../models");

const data = [
  {
    userId: 1,
    day: 2,
  },
];

const seedComments = () => Comment.bulkCreate(data);

module.exports = seedComments;
