let targets = document.getElementsByClassName("viewport-observe");
let observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("viewport-in");
      } else {
        if (entry.target.classList.contains("viewport-vanish")) {
          entry.target.classList.remove("viewport-in");
        }
      }
    });
  },
  { threshold: 0, rootMargin: "-12.8px" },
);
for (const target of targets) {
  observer.observe(target);
}
