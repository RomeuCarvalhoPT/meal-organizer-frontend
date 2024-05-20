// src/App.js
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import MenuGenerator from "./components/MenuGenerator";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Fab from "@mui/material/Fab";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Avatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import Dish from "./components/Dish";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem"; // Import MenuItem
import CircularProgress from '@mui/material/CircularProgress';
import config from './config.json';


const App = () => {
  const [dishes, setDishes] = useState([]);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null); // State for controlling the dropdown menu
  const apiEndpoint = config.API_ENDPOINT;
  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(apiEndpoint +
        "/dishes"
      );
      const data = await response.json();
      setDishes(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching dishes:", error);
    }
  };

  const handleDelete = async (id) => {
    try {

      await fetch(apiEndpoint +
        `/dishes/${id}`,
        {
          method: "DELETE",
        }
      );
      setDishes(dishes.filter((dish) => dish.id !== id));

    } catch (error) {
      console.error("Error deleting dish:", error);
    }
  };

  const handleShowDish = async (id) => {
    history.push(`/dish/${id}`); // Use template literals for string interpolation
  };

  function handleAddDish() {
    history.push("/editDish");
  }

  const StyledFab = styled(Fab)({
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto",
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigateToWeeklyMenu = () => {
    history.push("/allMenus"); // Adjust the path according to your routing setup
  };

  const navigateToIngredients = () => {
    history.push("/ingredients"); // Adjust the path according to your routing setup
  };


  if (isLoading) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  return (
    <Container maxWidth="sm">
      <React.Fragment>
        <CssBaseline />
        <Paper square sx={{ pb: "50px" }}>
          <Typography
            variant="h5"
            gutterBottom
            component="div"
            sx={{ p: 2, pb: 0 }}
          >
            Dishes
          </Typography>
          <Container>
            <List sx={{ mb: 2 }}>
              {dishes.map(({ id, name, picture }) => (
                <React.Fragment key={id}>
                  <ListItemButton>
                    <ListItemAvatar onClick={(event) => handleShowDish(id)}>
                      <Avatar alt="Dish Picture" src={picture} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={name}
                      onClick={(event) => handleShowDish(id)}
                    />
                    <Box display="flex" justifyContent="flex-end">
                      <ListItemButton onClick={(event) => handleDelete(id)}>
                        <DeleteIcon />
                      </ListItemButton>
                    </Box>
                  </ListItemButton>
                </React.Fragment>
              ))}
            </List>
          </Container>
        </Paper>
        <AppBar
          position="fixed"
          color="primary"
          sx={{ top: "auto", bottom: 0 }}
        >
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
            </Menu>
            <StyledFab
              color="primary"
              aria-label="add"
              onClick={() => handleAddDish()}
            >
              <AddIcon />
            </StyledFab>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton color="inherit" >
              <SearchIcon />
            </IconButton>
            <IconButton color="inherit" >
              <MoreIcon />
            </IconButton>
            
          </Toolbar>
        </AppBar>
      </React.Fragment>
    </Container>
  );
};

export default App;
