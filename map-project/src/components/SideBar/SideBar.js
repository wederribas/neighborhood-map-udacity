import React from "react";
import PropTypes from "prop-types";
import { LocationsList } from "components";
import { Drawer, TextField, withStyles } from "@material-ui/core";

const styles = theme => ({
  textField: {
    width: 200
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
    />
  );
}

function SideBar(props) {
  return (
    <Drawer open={props.isOpen} onClose={() => props.toggleSideBar(false)}>
      <FilterInput {...props} />
      <LocationsList />
    </Drawer>
  );
}

SideBar.propTypes = {
  toggleSideBar: PropTypes.func.isRequired
};

export default withStyles(styles)(SideBar);
