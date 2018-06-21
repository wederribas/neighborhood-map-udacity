import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { List, ListItem, ListItemText } from "@material-ui/core";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360
  }
});

function LocationsList(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <List component="nav">
        {props.locations.map(location => (
          <ListItem button key={location.id}>
            <ListItemText primary={location.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

LocationsList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LocationsList);
