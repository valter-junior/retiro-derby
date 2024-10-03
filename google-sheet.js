const scriptURL =
  "https://script.google.com/macros/s/AKfycbzKK5VdL8R6l9Ioy_zcCsjZ8ofCfNRPGN6HW9EtdAXW9cekYFSpddAcNMu1NZk3FwkpYQ/exec";

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
      successElement.style.display = "flex";
      isSubmitting = false;
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

backButton.addEventListener("click", () => {
  successElement.style.display = "none";
  window.location.reload();
});

document
  .getElementById("youtube-redirect")
  .addEventListener("click", function () {
    form.reset();
    window.location.href = "https://youtu.be/ppX9OPxq6Qw?si=5YlDx_f9MnKDeyir";
  });

copyPixButton.addEventListener("click", () => {
  pixCodeInput.select();
  pixCodeInput.setSelectionRange(0, 99999);

  navigator.clipboard
    .writeText(pixCodeInput.value)
    .then(() => {
      pixTooltip.style.display = "block";
      pixTooltip.classList.add("show-tooltip");

      // Hide the tooltip after 2 seconds
      setTimeout(() => {
        pixTooltip.classList.remove("show-tooltip");
        setTimeout(() => {
          pixTooltip.style.display = "none";
        }, 300); // wait for transition to end before hiding
      }, 2000);
    })
    .catch((error) => {
      console.error("Erro ao copiar o código PIX:", error);
    });
});
