const faders = document.querySelectorAll(".fade-page-out");
const body = <HTMLBodyElement>document.querySelector(".site");
faders.forEach((element) => {
  element.addEventListener("click", () => {
    body.classList.add("fade-out");
  });
});

let observer1 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.remove("fade-out");
    } else {
    }
  });
});

observer.observe(body);
