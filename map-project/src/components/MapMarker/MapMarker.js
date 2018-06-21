import React, { Component } from "react";
import { Marker, InfoWindow } from "react-google-maps";
import { getLocationSummary } from "utils/wikipediaApi";
import { Loading } from "components";

class InfoWindowContext extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locationSummary: null
    };
  }

  componentDidMount() {
    getLocationSummary(this.props.locationName).then(resp => {
      const pageId = Object.keys(resp.query.pages)[0];
      const locationSummary = resp.query.pages[pageId].extract;

      this.setState({
        locationSummary: locationSummary.substring(0, 250) + "..."
      });
    });
  }

  render() {
    const articleUrl =
      "https://en.wikipedia.org/wiki/" + this.props.locationName;

    return (
      <div style={{ maxWidth: "250px" }}>
        {this.state.locationSummary ? (
          <div>
            <h3>{this.props.locationName}</h3>
            <article>{this.state.locationSummary}</article>
            <a href={articleUrl}>View on Wikipedia</a>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

function MapMarker(props) {
  const location = props.location;
  const position = { lat: location.lat, lng: location.lng };

  return (
    <Marker
      position={position}
      defaultAnimation={window.google.maps.Animation.DROP}
      onClick={() => props.handleMarkerClick(location.id)}
    >
      {props.openedInfoWindow === location.id && (
        <InfoWindow onCloseClick={() => props.handleMarkerClick("")}>
          <InfoWindowContext locationName={location.name} />
        </InfoWindow>
      )}
    </Marker>
  );
}

export default MapMarker;
