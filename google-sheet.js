const scriptURL =
  "https://script.google.com/macros/s/AKfycbzSqKEeuFKPfGJQIFAClxyqr7f1XZQWyEo-MvgeWB3SDjD7elQScYQfCLAitJe4dnQybw/exec";
let isSubmitting = false;

const form = document.forms["subscription-form"];
const loadingElement = document.getElementById("loading");
const successElement = document.getElementById("success-message");
const backButton = document.getElementById("back-button");
const copyPixButton = document.getElementById("copy-pix-button");
const pixCodeInput = document.getElementById("pix-code");
const pixTooltip = document.getElementById("pix-tooltip");
const submitButton = document.getElementById("submit");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById("otherChurchOption").value =
    document.getElementById("otherChurch").value;

  if (isSubmitting) return;
  isSubmitting = true; // Lock the form for submission

  submitButton.disabled = true;
  loadingElement.style.display = "flex";

  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      loadingElement.style.display = "none";
      isSubmitting = false;
      window.location.href =
        " https://viver-comunidade.github.io/succeed-page/";
      form.reset();
    })
    .catch((error) => {
      console.error("Error!", error.message);
      loadingElement.style.display = "none";
      isSubmitting = false; // Unlock form submission
      submitButton.disabled = false;
      form.reset();
    });
});
