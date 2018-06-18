import React, { Component } from "react";
import PropTypes from "prop-types";
import { LocationsList } from "components";
import { Drawer, TextField, withStyles } from "@material-ui/core";

const styles = theme => ({
  textField: {
    width: "100%"
  }
});

function FilterInput(props) {
  const { classes } = props;
  return (
    <TextField
      id="filter"
      label="Filter locations"
      type="search"
      className={classes.textField}
      margin="normal"
      onChange={props.hangleInputChange}
      value={props.value}
    />
  );
}

class SideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchParam: ""
    };
  }

  static propTypes = {
    toggleSideBar: PropTypes.func.isRequired
  };

  handleSearchInput = event => {
    this.setState({
      searchParam: event.target.value
    });
  };

  render() {
    return (
      <Drawer
        open={this.props.isOpen}
        onClose={() => this.props.toggleSideBar(false)}
      >
        <FilterInput
          {...this.props}
          hangleInputChange={this.handleSearchInput}
          value={this.state.searchParam}
        />
        <LocationsList searchParam={this.state.searchParam} />
      </Drawer>
    );
  }
}

export default withStyles(styles)(SideBar);
