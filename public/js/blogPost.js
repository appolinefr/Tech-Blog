// handler creating a new game/saveFile/character
const newPostHandler = async (event) => {
  event.preventDefault();

  const postTitle = document.querySelector("#new-post-title").value.trim();
  const postcontent = document.querySelector("#new-post-content").value.trim();

  if (postTitle && postcontent) {
    //route to fill out
    const response = await fetch(`/api/`, {
      method: "POST",
      body: JSON.stringify({ postTitle, postcontent}),
      headers: {
        "Content-Type": "application/json",
      },
    });

    //route to fill out
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to create new post!");
    }
  }
};

//deleting a game/saveFile/character
const deletePostHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const postId = event.target.getAttribute("data-id");

    //route to maybe change
    const response = await fetch(`/api/posts/${postId}`, {
      method: "DELETE",
    });

    //route to fill out
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to delete game");
    }
  }
};

document.querySelector(".new-post-btn").addEventListener("submit", newPostHandler);

document
  .querySelector(".delete-post-btn")
  .addEventListener("click", deletePostHandler);
