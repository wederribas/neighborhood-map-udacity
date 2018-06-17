import React, { Component } from "react";
import { Map, NavBar, SideBar } from "components";
import "./App.css";

const googleMapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBA-uoB5bdBv-1xqWs-Eyh9ZbUxx-zEJog`;

const mapContainerStyles = {
  position: "absolute",
  top: 58,
  left: 0,
  right: 0,
  bottom: 0,
  justifyContent: "flex-end",
  alignItems: "center"
};

const mapElementStyles = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSideBarOpen: false
    };
  }

  handleSideBarToggle = isOpen => {
    this.setState({
      isSideBarOpen: isOpen
    });
  };

  render() {
    return (
      <div>
        <NavBar toggleSideBar={this.handleSideBarToggle} />
        <SideBar
          isOpen={this.state.isSideBarOpen}
          toggleSideBar={this.handleSideBarToggle}
        />
        <Map
          googleMapURL={googleMapURL}
          loadingElement={<div style={{ height: "100%" }} />}
          containerElement={<div style={mapContainerStyles} />}
          mapElement={<div style={mapElementStyles} />}
        />
      </div>
    );
  }
}

export default App;
