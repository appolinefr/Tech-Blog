const { BlogPost } = require("../models");

const data = [
  {
    title: "Regex Tutorial",
    content:
      "A regex, which is short for regular expression, is a sequence of characters that defines a specific search pattern. When included in code or search algorithms, regular expressions can be used to find certain patterns of characters within a string, or to find and replace a character or sequence of characters within a string. They are also frequently used to validate input.",
    date_created: 02 / 09 / 2022,
    user_id: 1,
  },
  {
    title: "Bulma CSS",
    content:
      "Bulma is a free, open source framework that provides ready-to-use frontend components that you can easily combine to build responsive web interfaces.",
    date_created: 11 / 09 / 2022,
    user_id: 1,
  },
  {
    title: "React",
    content:
      "React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.",
    date_created: 01 / 10 / 2022,
    user_id: 2,
  },
];

const seedBlogposts = () => BlogPost.bulkCreate(data);

module.exports = seedBlogposts;
