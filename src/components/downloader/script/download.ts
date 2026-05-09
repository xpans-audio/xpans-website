const downloadButton = <HTMLButtonElement>(
  document.getElementById("download-button")
);
const downloadButtonLink = <HTMLAnchorElement>(
  document.getElementById("download-button-link")
);
const downloadSelect = <HTMLSelectElement>(
  document.getElementById("download-select")
);
downloadSelect.addEventListener("change", changeLink);

function changeLink() {
  downloadButtonLink.href = downloadSelect.value;
  downloadButton.innerHTML =
    "Download for " +
    downloadSelect.options[downloadSelect.selectedIndex]?.text;
}

changeLink();
