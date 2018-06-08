const openedInfoWindow = [];

function closeInfoWindows() {
  openedInfoWindow.map(infoWindow => {
    infoWindow.close();
  });
}

function Marker(map, location) {
  const self = this;

  this.marker = new google.maps.Marker({
    id: location.id,
    title: location.name,
    position: {
      lat: location.lat,
      lng: location.lng
    },
    animation: google.maps.Animation.DROP
  });

  self.marker.addListener("click", function() {
    closeInfoWindows();
    openInfoWindowWithAnimation(map, this);
  });

  self.marker.setMap(map);
}

function openInfoWindowWithAnimation(map, marker) {
  const infoWindow = new google.maps.InfoWindow();

  openedInfoWindow.push(infoWindow);

  const wikipediaAPI =
    "https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&exintro=&explaintext=&titles=";

  const articleUrl = "https://en.wikipedia.org/wiki/" + marker.title;

  fetch(wikipediaAPI + marker.title, {
    headers: {
      "content-type": "application/json"
    }
  }).then(function(response) {
    response
      .json()
      .then(data => {
        const pageId = Object.keys(data.query.pages)[0];

        const locationSummary = data.query.pages[pageId].extract;

        const content = `
        <div>
          <h3>${marker.title}</h3>
          <article class="infowindow-text">
            ${locationSummary.substring(0, 250)}...
          </article>
          <a href="${articleUrl}">View on Wikipedia</a>
        </div>
      `;

        infoWindow.setContent(content);

        infoWindow.open(map, marker);
      })
      .catch(error => {
        document.getElementById("wikipedia-error-modal").style.display =
          "block";
      });
  });

  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);

    const self = marker;
    setTimeout(function() {
      marker.setAnimation(null);
    }, 500);
  }
}

function MapViewModel(map) {
  const self = this;

  self.markers = ko.observableArray([]);
  self.locationFilter = ko.observable("");

  self.locationsList = ko.computed(function() {
    const list = [];
    locations.map(location => {
      self.markers.push(new Marker(map, location));
      list.push(location);
    });

    return list;
  });

  self.selectLocation = function(clickedMarker) {
    selectedMarker = self.markers()[clickedMarker.id].marker;
    google.maps.event.trigger(selectedMarker, "click");
  };

  self.visibleLocations = ko.computed(function() {
    return self.locationsList().filter(function(location) {
      let isVisible = true;
      const locationName = location.name.toLowerCase();
      const filter = self.locationFilter().toLowerCase();

      if (self.locationFilter() && locationName.indexOf(filter) == -1) {
        closeInfoWindows();
        isVisible = false;
      }

      marker = self.markers()[location.id].marker;
      marker.setVisible(isVisible);

      return isVisible;
    });
  });
}

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 43.675, lng: -79.393 },
    zoom: 12
  });

  return ko.applyBindings(new MapViewModel(map));
}
