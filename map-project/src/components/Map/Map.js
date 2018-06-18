import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import { MapMarker } from "components";

function Map(props) {
  return (
    <GoogleMap defaultZoom={12} defaultCenter={{ lat: 43.675, lng: -79.393 }}>
      <MapMarker />
    </GoogleMap>
  );
}

export default withScriptjs(withGoogleMap(Map));
