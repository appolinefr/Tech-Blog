// the blogpost page is the homepage where all posts are displayed. You can add comments on posts

const getAllPosts = async () => {
  const response = await fetch(`/api/blogPost`, { method: "GET" });
  const responseData = await response.json();

  if (response.ok === false) console.log("Failed to get posts");
  else return responseData;
};

const addCommentPostHandler = async (event) => {
  //check data-id or replace with post id
  if (event.target.hasAttribute("data-id")) {
    const postId = event.target.getAttribute("data-id");

    const response = await fetch(`/api/blogPost/${postId}`, {
      method: "POST",
    });

    if (response.ok) {
      document.location.replace("/homepage");
    } else {
      alert("Failed to comment on post");
    }
  }
};

document
  .getElementById("post-comment-btn")
  .addEventListener("click", addCommentPostHandler);

// Functions to open and close a modal

setModalsUp = () => {
  function openModal() {
    const openModal = document.querySelector("#comment-modal");
    openModal.classList.add("is-active");
  }

  function closeModal() {
    const closeModal = document.querySelector("#comment-modal");
    closeModal.classList.remove("is-active");
  }

  document
    .getElementById("js-modal-trigger")
    .addEventListener("click", openModal);

  document.getElementById("modal-close").addEventListener("click", closeModal);
};

setModalsUp();
