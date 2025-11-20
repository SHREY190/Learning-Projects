const loginDisplayButton = document.getElementById("displayLogin");
const signupDisplayButton = document.getElementById("displaySignup");

const loginSection = document.getElementById("loginSection");
const signupSection = document.getElementById("signupSection");

// Handle Change in Form Type

loginDisplayButton.classList.add("active");
signupDisplayButton.classList.remove("active");

loginSection.classList.remove("hidden");
signupSection.classList.add("hidden");

document.addEventListener("click", (e) => {
  if (loginDisplayButton.contains(e.target)) {
    loginDisplayButton.classList.add("active");
    signupDisplayButton.classList.remove("active");

    loginSection.classList.remove("hidden");
    signupSection.classList.add("hidden");
  }

  if (signupDisplayButton.contains(e.target)) {
    signupDisplayButton.classList.add("active");
    loginDisplayButton.classList.remove("active");

    signupSection.classList.remove("hidden");
    loginSection.classList.add("hidden");
  }
});
