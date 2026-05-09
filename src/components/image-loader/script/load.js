let load_observes = document.querySelectorAll(".observe-load");

function on_load(target) {
  target.classList.add("loaded");
}

function for_observe(container) {
  let image = container.querySelector("img");
  if (image.complete) {
    on_load(container);
  } else {
    image.addEventListener("load", () => {
      on_load(container);
    });
  }
}

load_observes.forEach((container) => for_observe(container));
