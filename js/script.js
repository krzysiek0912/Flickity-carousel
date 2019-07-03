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
  var sydney = { lat: -33.874237, lng: 151.198517 };
  var coords2 = { lat: -25.363, lng: 134.044 };
  var coords3 = { lat: -25.363, lng: 137.044 };

  // The map, centered at Uluru
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: uluru
  });

  for (var i = 0; i < sliderData.length; i++) {
    let markers = new google.maps.Marker({
      position: sliderData[i].coords,
      map: map,
      i: i
    });
    // console.log(i);
    markers.addListener("click", function() {
      flkty.select(markers.i, false, true);

      //   console.log(markers.i);
    });
    // console.log(marker);
    //     infos.innerHTML = "You clicked markerThree";
    //   });
  }

  //   var markerOne = new google.maps.Marker({
  //     position: center,
  //     map: map
  //   });
  //   // The marker, positioned at Uluru

  //   var marker = new google.maps.Marker({ position: uluru, map: map });

  //   markerOne.addListener("click", function() {
  //     // Wewnątrz funcji wpisujemy kod, który ma się wykonać po kliknięciu markera. W tym przykładzie wyświetlimy tekst na stronie.
  //     infos.innerHTML = "You clicked markerOne";
  //   });
  //   var markerTwo = new google.maps.Marker({
  //     position: coords2,
  //     map: map
  //   });

  //   markerTwo.addListener("click", function() {
  //     infos.innerHTML = "You clicked markerTwo";
  //   });

  //   var markerThree = new google.maps.Marker({
  //     position: coords3,
  //     map: map
  //   });

  //   markerThree.addListener("click", function() {
  //     infos.innerHTML = "You clicked markerThree";
  //   });

  //   document
  //     .getElementById("center-map")
  //     .addEventListener("click", function(event) {
  //       event.preventDefault();
  //       // Najpierw wykorzystujemy metodę panTo w obiekcie map do przesunięcia współrzędnych mapy:
  //       map.panTo(sydney);

  //       // A następnie zmieniamy powiększenie mapy:
  //       map.setZoom(10);
  //     });
  //   document
  //     .getElementById("center-smooth")
  //     .addEventListener("click", function(event) {
  //       event.preventDefault();
  //       smoothPanAndZoom(map, 7, uluru);
  //     });
}; //End Map

var smoothPanAndZoom = function(map, zoom, coords) {
  // Trochę obliczeń, aby wyliczyć odpowiedni zoom do którego ma oddalić się mapa na początku animacji.
  var jumpZoom = zoom - Math.abs(map.getZoom() - zoom);
  jumpZoom = Math.min(jumpZoom, zoom - 1);
  jumpZoom = Math.max(jumpZoom, 3);

  // Zaczynamy od oddalenia mapy do wyliczonego powiększenia.
  smoothZoom(map, jumpZoom, function() {
    // Następnie przesuwamy mapę do żądanych współrzędnych.
    smoothPan(map, coords, function() {
      // Na końcu powiększamy mapę do żądanego powiększenia.
      smoothZoom(map, zoom);
    });
  });
};

var smoothZoom = function(map, zoom, callback) {
  var startingZoom = map.getZoom();
  var steps = Math.abs(startingZoom - zoom);

  // Jeśli steps == 0, czyli startingZoom == zoom
  if (!steps) {
    // Jeśli podano trzeci argument
    if (callback) {
      // Wywołaj funkcję podaną jako trzeci argument.
      callback();
    }
    // Zakończ działanie funkcji
    return;
  }

  // Trochę matematyki, dzięki której otrzymamy -1 lub 1, w zależności od tego czy startingZoom jest mniejszy od zoom
  var stepChange = -(startingZoom - zoom) / steps;

  var i = 0;
  // Wywołujemy setInterval, który będzie wykonywał funkcję co X milisekund (X podany jako drugi argument, w naszym przypadku 80)
  var timer = window.setInterval(function() {
    // Jeśli wykonano odpowiednią liczbę kroków
    if (++i >= steps) {
      // Wyczyść timer, czyli przestań wykonywać funkcję podaną w powyższm setInterval
      window.clearInterval(timer);
      // Jeśli podano trzeci argument
      if (callback) {
        // Wykonaj funkcję podaną jako trzeci argument
        callback();
      }
    }
    // Skorzystaj z metody setZoom obiektu map, aby zmienić powiększenie na zaokrąglony wynik poniższego obliczenia
    map.setZoom(Math.round(startingZoom + stepChange * i));
  }, 80);
};

// Poniższa funkcja działa bardzo podobnie do smoothZoom. Spróbuj samodzielnie ją przeanalizować.
var smoothPan = function(map, coords, callback) {
  var mapCenter = map.getCenter();
  coords = new google.maps.LatLng(coords);

  var steps = 12;
  var panStep = {
    lat: (coords.lat() - mapCenter.lat()) / steps,
    lng: (coords.lng() - mapCenter.lng()) / steps
  };

  var i = 0;
  var timer = window.setInterval(function() {
    if (++i >= steps) {
      window.clearInterval(timer);
      if (callback) callback();
    }
    map.panTo({
      lat: mapCenter.lat() + panStep.lat * i,
      lng: mapCenter.lng() + panStep.lng * i
    });
  }, 1000 / 30);
};
