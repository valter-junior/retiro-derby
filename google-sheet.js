const scriptURL =
  "https://script.google.com/macros/s/AKfycbzKK5VdL8R6l9Ioy_zcCsjZ8ofCfNRPGN6HW9EtdAXW9cekYFSpddAcNMu1NZk3FwkpYQ/exec";

const form = document.forms["subscription-form"];
const loadingElement = document.getElementById("loading");
const successElement = document.getElementById("success-message");
const backButton = document.getElementById("back-button");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  loadingElement.style.display = "flex";

  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      loadingElement.style.display = "none";
      successElement.style.display = "flex";
    })
    .catch((error) => {
      console.error("Error!", error.message);
      loadingElement.style.display = "none";
    });
});

backButton.addEventListener("click", () => {
  successElement.style.display = "none";
  form.reset();
  window.location.reload();
});
