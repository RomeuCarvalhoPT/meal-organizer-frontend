// src/components/molecules/AppBarMenu.js
import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
});

const AppBarMenu = ({ navigateToWeeklyMenu, navigateToIngredients, navigateToLogout, handleAddDish }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
      <Toolbar>
        <IconButton color="inherit" aria-label="open drawer" onClick={handleClick}>
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={navigateToWeeklyMenu}>Weekly Menu</MenuItem>
          <MenuItem onClick={navigateToIngredients}>Ingredients</MenuItem>
          <MenuItem onClick={navigateToLogout}>Logout</MenuItem>
        </Menu>
        <StyledFab color="primary" aria-label="add" onClick={handleAddDish}>
          <AddIcon />
        </StyledFab>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarMenu;
