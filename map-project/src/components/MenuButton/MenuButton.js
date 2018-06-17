import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const styles = {
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

function MenuButton(props) {
  const { classes } = props;
  return (
    <IconButton
      className={classes.menuButton}
      color="inherit"
      aria-label="Menu"
      onClick={() => props.handleClick(true)}
    >
      <MenuIcon />
    </IconButton>
  );
}

MenuButton.propTypes = {
  classes: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired
};

export default withStyles(styles)(MenuButton);
