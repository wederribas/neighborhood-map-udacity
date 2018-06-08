// Create array to store current opened infoWindow
const openedInfoWindow = [];

/**
 * @description Close all active infoWindows
 * @returns {boolean}
 */
function closeInfoWindows() {
  openedInfoWindow.map(infoWindow => {
    infoWindow.close();
  });

  return true;
}

/**
 * @description Set Google Maps marker into the rendered map
 * @param {object} map
 * @param {object} location
 * @returns {boolean}
 */
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

  // Add the marker to the map
  self.marker.setMap(map);

  return true;
}

/**
 * @description Open an infoWindow related to a specific marker.
 *  It animates the marker and trigger the data fetch to Wikipedia API.
 * @param {object} map
 * @param {object} marker
 * @returns {boolean}
 */
function openInfoWindowWithAnimation(map, marker) {
  const infoWindow = new google.maps.InfoWindow();

  openedInfoWindow.push(infoWindow);

  const wikipediaAPI =
    "https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&exintro=&explaintext=&titles=";

  const articleUrl = "https://en.wikipedia.org/wiki/" + marker.title;

  // Fetch location article summary from Wikipedia API
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

        // Build HTML content to fill into infoWindow
        const content = `
          <div>
            <h3>${marker.title}</h3>
            <article class="infowindow-text">
              ${locationSummary.substring(0, 250)}...
            </article>
            <a href="${articleUrl}">View on Wikipedia</a>
          </div>
        `;

        // Add content and open the infoWindow
        infoWindow.setContent(content);
        infoWindow.open(map, marker);
      })
      .catch(error => {
        document.getElementById("wikipedia-error-modal").style.display =
          "block";
      });
  });

  // Animates the marker with a bounce
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);

    // Stop the animation after .5 second
    const self = marker;
    setTimeout(function() {
      marker.setAnimation(null);
    }, 500);
  }

  return true;
}

/**
 * @description Instantiate the app view model with loaded map
 * @param {object} map
 * @returns {boolean}
 */
function MapViewModel(map) {
  const self = this;

  self.markers = ko.observableArray([]);
  self.locationFilter = ko.observable("");

  // Set the list of locations to compose the sidebar list
  self.locationsList = ko.computed(function() {
    const list = [];
    locations.map(location => {
      self.markers.push(new Marker(map, location));
      list.push(location);
    });

    return list;
  });

  // Handles the marker click when selecting a location in the list
  self.selectLocation = function(clickedMarker) {
    selectedMarker = self.markers()[clickedMarker.id].marker;
    google.maps.event.trigger(selectedMarker, "click");
  };

  // Filters the locations based in user query
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

  return true;
}

/**
 * @description Initiate the Google Maps instance
 * @returns {object} The Knockout binding statement
 */
function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 43.675, lng: -79.393 },
    zoom: 12
  });

  return ko.applyBindings(new MapViewModel(map));
}
