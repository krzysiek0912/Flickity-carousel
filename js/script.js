const elem = document.querySelector(".main-carousel"),
  buttonFirst = document.querySelector(".button-first"),
  progressBar = document.querySelector(".progress-bar"),
  carousel = document.querySelector(".main-carousel");

let sliderItemTemplate = document.querySelector("#template-slider-item")
    .innerHTML,
  sliderItems = "";

Mustache.parse(sliderItemTemplate);

for (var i = 0; i < sliderData.length; i++) {
  sliderItems += Mustache.render(sliderItemTemplate, {
    ...sliderData[i],
    id: i
  });
}

carousel.insertAdjacentHTML("beforeend", sliderItems);

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
