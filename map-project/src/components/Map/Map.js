import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";

function Map(props) {
  return (
    <GoogleMap defaultZoom={12} defaultCenter={{ lat: 43.675, lng: -79.393 }} />
  );
}

export default withScriptjs(withGoogleMap(Map));
