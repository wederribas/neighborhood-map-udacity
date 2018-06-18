import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { locations } from "assets/locations";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360
  }
});

class LocationsList extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <List component="nav">
          {locations
            .filter(location => {
              const searchParam = this.props.searchParam.toLowerCase();
              const locationName = location.name.toLowerCase();

              if (searchParam && locationName.indexOf(searchParam) === -1) {
                return false;
              }

              return true;
            })
            .map(location => (
              <ListItem button key={location.id}>
                <ListItemText primary={location.name} />
              </ListItem>
            ))}
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(LocationsList);
