const scriptURL = "https://script.google.com/macros/s/AKfycbzKK5VdL8R6l9Ioy_zcCsjZ8ofCfNRPGN6HW9EtdAXW9cekYFSpddAcNMu1NZk3FwkpYQ/exec";

const form = document.forms["subscription-form"];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) =>
      alert("Thank you! your form is submitted successfully.")
    )
    .then(() => {
      window.location.reload();
    })
    .catch((error) => console.error("Error!", error.message));
});
