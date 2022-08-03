import React from "react";
import PropTypes from "prop-types";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
Header.propTypes = {};

function Header({ noti }) {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" component="div">
          <Link to="/admin" className="link">
            Admin
          </Link>
        </Typography>
        <Typography variant="h6" color="inherit" component="div">
          <Link to="/author" className="link">
            Author
          </Link>
        </Typography>
        <Typography variant="h6" color="inherit" component="div">
          {noti}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
