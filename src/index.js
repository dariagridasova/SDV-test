
import "./styles/style-default.scss";
import "./styles/main.scss";
import "./styles/overlay.scss";
import "./styles/form.scss";
import "./registration-validation"

const overlayWithForm = document.getElementById("overlay"),
      sectionRegistration = document.getElementById("section-registration-instruction");

document.getElementById("open-form").addEventListener("click", function () {
    overlayWithForm.classList.add("active");
    sectionRegistration.classList.add("blur");
});

document.getElementById("close").addEventListener("click", function () {
    overlayWithForm.classList.remove("active");
    sectionRegistration.classList.remove("blur");
});

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        overlayWithForm.classList.remove("active");
        sectionRegistration.classList.remove("blur");
    }
});