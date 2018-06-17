import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { List, ListItem, ListItemText } from "@material-ui/core";

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
          <ListItem button>
            <ListItemText primary="CN Tower" />
          </ListItem>
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(LocationsList);
