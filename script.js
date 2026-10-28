const tabButtons = document.querySelectorAll(".tab-button");
const pages = document.querySelectorAll(".page");
const pageLinks = document.querySelectorAll("[data-page-link]");

function showPage(pageId) {
  const selectedPage = document.getElementById(pageId);
  if (!selectedPage || !selectedPage.classList.contains("page")) return;

  pages.forEach((page) => {
    page.hidden = page !== selectedPage;
  });

  tabButtons.forEach((button) => {
    const isSelected = button.dataset.page === pageId;
    button.classList.toggle("active", isSelected);
    if (isSelected) {
      button.setAttribute("aria-current", "page");
    } else {
      button.removeAttribute("aria-current");
    }
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => showPage(button.dataset.page));
});

pageLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    showPage(link.dataset.pageLink);
  });
});

document.querySelectorAll(".signin-form").forEach((accountGroup) => {
  const feedback = accountGroup.querySelector(".signin-feedback");
  if (!feedback) return;

  function showDemoMessage(message) {
    accountGroup.querySelectorAll("input").forEach((field) => {
      field.value = "";
    });
    feedback.textContent = message;
    feedback.hidden = false;
  }

  const submitButton = accountGroup.querySelector(".signin-submit");
  if (submitButton) {
    submitButton.addEventListener("click", () => {
      showDemoMessage("This demo isn’t connected to an account service. Your entries have been cleared and weren’t sent or saved.");
    });
  }

  accountGroup.querySelectorAll("[data-signin-message]").forEach((button) => {
    button.addEventListener("click", () => {
      showDemoMessage(button.dataset.signinMessage);
    });
  });
});
