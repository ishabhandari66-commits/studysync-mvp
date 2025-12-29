const profileBox = document.getElementById("profileBox");
const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");

function toggleProfile() {
  profileBox.style.display =
    profileBox.style.display === "block" ? "none" : "block";

  const user = JSON.parse(localStorage.getItem("studysyncUser"));
  if (user) {
    profileName.innerText = user.username;
    profileEmail.innerText = user.email;
  }
}

function logout() {
  localStorage.removeItem("studysyncUser");
  location.reload();
}