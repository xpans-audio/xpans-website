let linkElements = <NodeListOf<HTMLHeadingElement>>(
  document.querySelectorAll(".get-intrapage-links h2")
);
let intrapageLinks = <HTMLHtmlElement>(
  document.getElementById("intrapage-links")
);

linkElements.forEach((element) => {
  let link = <HTMLAnchorElement>document.createElement("a");
  let list_item = <HTMLLIElement>document.createElement("li");
  list_item.classList.add("intrapage-link");
  link.innerHTML = element.innerHTML;
  link.href = "#" + element.id;
  list_item.appendChild(link);
  intrapageLinks.appendChild(list_item);
});
