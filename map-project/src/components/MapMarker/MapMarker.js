import React from "react";
import PropTypes from "prop-types";
import { Marker } from "react-google-maps";

function MapMarker(props) {
  return <Marker position={{ lat: 43.6780642, lng: -79.4094638 }} />;
}

export default MapMarker;
