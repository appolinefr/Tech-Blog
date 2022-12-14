// handler creating a new game/saveFile/character
const newPostHandler = async (event) => {
  event.preventDefault();

  const postTitle = document.querySelector("#new-post-title").value.trim();
  const postcontent = document.querySelector("#new-post-content").value.trim();

  if (postTitle && postcontent) {
    //route to fill out
    const response = await fetch(`/api/blogPost`, {
      method: "POST",
      body: JSON.stringify({ postTitle, postcontent }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    //route to fill out
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to create new post!");
    }
  }
};

//deleting a blogpost // check the parameter in model
const deletePostHandler = async (postId) => {
  //route to maybe change
  const response = await fetch(`/api/blogPost/${postId}`, {
    method: "DELETE",
  });

  //route to fill out
  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Failed to delete post");
  }
};

const updatePostHandler = async (event) => {
  //check data-id or replace with post id
  if (event.target.hasAttribute("data-id")) {
    const postId = event.target.getAttribute("data-id");

    //check route
    const response = await fetch(`/api/blogPost/${postId}`, {
      method: "PUT",
    });

    //route to fill out
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to update post");
    }
  }
};

async function getAllPosts() {
  //route to fill out
  const response = await fetch(`/api/dashboard`, { method: "GET" });
  const responseData = await response.json();

  if (response.ok === false) console.log("Failed to get posts");
  else return responseData;
}

document
  .querySelector(".new-post-btn")
  .addEventListener("submit", newPostHandler);

document
  .querySelector(".delete-post-btn")
  .addEventListener("click", deletePostHandler);

document
  .querySelector(".update-post-btn")
  .addEventListener("click", updatePostHandler);

document.addEventListener("DOMContentLoaded", () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add("is-active");
  }

  function closeModal($el) {
    $el.classList.remove("is-active");
  }

  function closeAllModals() {
    (document.querySelectorAll(".modal") || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll(".js-modal-trigger") || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener("click", () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (
    document.querySelectorAll(
      ".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button"
    ) || []
  ).forEach(($close) => {
    const $target = $close.closest(".modal");

    $close.addEventListener("click", () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener("keydown", (event) => {
    const e = event || window.event;

    if (e.keyCode === 27) {
      // Escape key
      closeAllModals();
    }
  });
});
