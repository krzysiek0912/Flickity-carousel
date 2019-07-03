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
var infos = document.getElementById("infos");
//Google Map
window.initMap = function() {
  // The location of Uluru
  var uluru = sliderData[0].coords;

  // The map, centered at Uluru
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: uluru
  });
  for (var i = 0; i < sliderData.length; i++) {
    let marker = new google.maps.Marker({
      position: sliderData[i].coords,
      map: map
    });
  }
}; //End Map
