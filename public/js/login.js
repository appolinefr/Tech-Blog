const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      //location to fill out
      document.location.replace("/homepage");
    } else {
      alert(response.statusText);
    }
  }
};

function goToSignUpHandler() {
  document.location.replace("/signUp");
}

document
  .querySelector("#login-btn")
  .addEventListener("click", loginFormHandler);

document
  .querySelector("#signUp-page-btn")
  .addEventListener("click", goToSignUpHandler);
