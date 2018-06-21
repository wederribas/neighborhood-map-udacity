import React, { Component } from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import { MapMarker } from "components";

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openedInfoWindow: null
    };
  }

  toggleInfoWindow = id => {
    this.setState({
      openedInfoWindow: id
    });
  };

  render() {
    return (
      <GoogleMap defaultZoom={12} defaultCenter={{ lat: 43.675, lng: -79.393 }}>
        {this.props.locations.map(location => (
          <MapMarker
            key={location.id}
            location={location}
            openedInfoWindow={this.state.openedInfoWindow}
            handleMarkerClick={this.toggleInfoWindow}
          />
        ))}
      </GoogleMap>
    );
  }
}

export default withScriptjs(withGoogleMap(Map));
