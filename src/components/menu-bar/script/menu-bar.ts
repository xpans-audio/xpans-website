const menu = <HTMLDivElement>document.getElementById("menu-container");
const menu_bar = <HTMLDivElement>document.getElementById("menu-bar");
const menu_button = <HTMLInputElement>document.getElementById("menu-button");
const menu_overlay = <HTMLDivElement>document.getElementById("menu-overlay");
const menu_items = <HTMLCollectionOf<Element>>(
  document.getElementsByClassName("menu-link")
);
const menu_items_len = menu_items.length;

menu_button.addEventListener("change", toggleMenuBar);
menu_overlay.addEventListener("click", closeMenuBar);

const media = window.matchMedia("(width < 50rem)");
media.onchange = (e) => updateMenuBar(e);

menu_button.checked = false;

function toDesktop() {
  menu.classList.remove("show");
  menu.removeAttribute("inert");
  menu.removeAttribute("aria-expanded");
  menu_button.checked = false;
  menu_button.setAttribute("inert", "");
  menu_overlay.classList.remove("show");
}

function toMobile() {
  menu.setAttribute("inert", "");
  menu.setAttribute("aria-expanded", "false");
  menu_button.removeAttribute("inert");
}

function updateMenuBar(e: MediaQueryListEvent) {
  const isMobile = e.matches;
  if (isMobile) {
    toMobile();
  } else {
    toDesktop();
  }
}

export function openMenuBar() {
  menu.classList.add("show");
  menu.removeAttribute("inert");
  menu.setAttribute("aria-expanded", "true");
  menu_bar.classList.add("overlay-on");
  menu_button.checked = true;
  menu_overlay.classList.add("show");
  menu_overlay.removeAttribute("inert");
  for (let i = 0; i < menu_items_len; i++) {
    menu_items.item(i)?.classList.add("show");
  }
}

export function closeMenuBar() {
  menu.classList.remove("show");
  menu.setAttribute("inert", "");
  menu.setAttribute("aria-expanded", "false");
  menu_bar.classList.remove("overlay-on");
  menu_button.checked = false;
  menu_overlay.classList.remove("show");
  menu_overlay.setAttribute("inert", "");
  for (let i = 0; i < menu_items_len; i++) {
    menu_items.item(i)?.classList.remove("show");
  }
}

export function toggleMenuBar() {
  if (menu_button.checked) {
    openMenuBar();
  } else {
    closeMenuBar();
  }
}
