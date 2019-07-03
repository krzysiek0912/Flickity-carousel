const elem = document.querySelector(".main-carousel"),
  buttonFirst = document.querySelector(".button-first"),
  progressBar = document.querySelector(".progress-bar");

var flkty = new Flickity(elem, {
  // options
  cellAlign: "left",
  contain: true,
  pageDots: false,
  hash: true
});

buttonFirst.addEventListener("click", function() {
  flkty.select(0, false, true);
});

flkty.on("scroll", function(progress) {
  progress = Math.max(0, Math.min(1, progress));
  progressBar.style.width = progress * 100 + "%";
});
