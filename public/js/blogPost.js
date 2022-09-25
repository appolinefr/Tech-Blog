// the blogpost page is the homepage where all posts are displayed. You can add comments on posts

async function getAllPosts() {
  //route to fill out
  const response = await fetch(`/api/blogPost`, { method: "GET" });
  const responseData = await response.json();

  if (response.ok === false) console.log("Failed to get posts");
  else return responseData;
}

const addCommentPostHandler = async (event) => {
  //check data-id or replace with post id
  if (event.target.hasAttribute("data-id")) {
    const postId = event.target.getAttribute("data-id");

    //check route
    const response = await fetch(`/api/blogPost/${postId}`, {
      method: "POST",
    });

    //route to fill out
    if (response.ok) {
      document.location.replace("/blogpost");
    } else {
      alert("Failed to comment on post");
    }
  }
};

document
  .querySelector(".comment-btn")
  .addEventListener("submit", addCommentPostHandler);
