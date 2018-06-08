function Marker(map, location) {
  const self = this;

  this.marker = new google.maps.Marker({
    id: location.id,
    title: location.title,
    position: {
      lat: location.lat,
      lng: location.lng
    },
    animation: google.maps.Animation.DROP
  });

  self.marker.addListener("click", function() {
    openInfoWindowWithAnimation(this);
  });

  self.marker.setMap(map);
}

function openInfoWindowWithAnimation(marker) {
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

  self.locationsList = ko.computed(function() {
    const list = [];
    locations.map(location => {
      self.markers.push(new Marker(map, location));
      list.push(location);
    });

    return list;
  });

  self.selectLocation = function(clickedMarker) {
    google.maps.event.trigger(self.markers()[clickedMarker.id].marker, "click");
  };
}

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 43.675, lng: -79.393 },
    zoom: 12
  });

  return ko.applyBindings(new MapViewModel(map));
}
